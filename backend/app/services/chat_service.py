
from fastapi import BackgroundTasks
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.schemas.chat import ChatRequest, ChatResponse
from app.schemas.execution import ExecutionCreate, ExecutionEventCreate
from app.services.conversation_service import add_message, get_messages
from app.services.execution_service import (
    create_execution,
    update_execution_status,
    add_execution_event,
)
from app.services.dynamo_ai_service import run_dynamo_ai


def process_chat(
    db: Session,
    request: ChatRequest,
    background_tasks: BackgroundTasks,
) -> ChatResponse:
    add_message(
        db,
        conversation_id=request.conversation_id,
        sender="user",
        text=request.message,
    )

    execution = create_execution(
        db,
        ExecutionCreate(conversation_id=request.conversation_id),
    )

    background_tasks.add_task(
        run_execution_background,
        execution.id,
        request.conversation_id,
        request.message,
    )

    return ChatResponse(
        conversation_id=request.conversation_id,
        execution_id=execution.id,
        message="DYNAMO AI execution started.",
        status="accepted",
    )


async def run_execution_background(
    execution_id: str,
    conversation_id: str,
    query: str,
) -> None:
    # Use a fresh database session for the background execution.
    db = SessionLocal()

    try:
        update_execution_status(db, execution_id, "running")

        add_execution_event(
            db,
            ExecutionEventCreate(
                execution_id=execution_id,
                agent="orchestrator",
                event="graph_started",
                status="started",
            ),
        )

        messages = get_messages(db, conversation_id)
        history = [
            {"sender": msg.sender, "text": msg.text}
            for msg in messages[-10:]
        ]

        result = await run_dynamo_ai(query, history)
        report = str(result.get("report") or "").strip()

        if not report:
            raise RuntimeError("The AI workflow returned an empty report.")

        add_execution_event(
            db,
            ExecutionEventCreate(
                execution_id=execution_id,
                agent="orchestrator",
                event="graph_completed",
                status="completed",
            ),
        )

        # Record the outcome of each agent selected by the graph.
        outputs = result.get("agent_outputs", {})
        for agent_name in result.get("agents_used", []):
            output = outputs.get(agent_name, {})
            findings = str(output.get("findings", ""))
            agent_error = (
                bool(output.get("error"))
                or findings.startswith("[ERROR]")
            )

            add_execution_event(
                db,
                ExecutionEventCreate(
                    execution_id=execution_id,
                    agent=agent_name,
                    event="agent_execution",
                    status="failed" if agent_error else "completed",
                ),
            )

        add_message(
            db,
            conversation_id=conversation_id,
            sender="assistant",
            text=report,
        )

        update_execution_status(
            db,
            execution_id,
            "completed",
            final_response=report,
        )

    except Exception as exc:
        try:
            update_execution_status(
                db,
                execution_id,
                "failed",
                final_response=f"AI execution failed: {exc}",
            )
            add_execution_event(
                db,
                ExecutionEventCreate(
                    execution_id=execution_id,
                    agent="orchestrator",
                    event="graph_failed",
                    status="failed",
                ),
            )
        except Exception:
            db.rollback()

    finally:
        db.close()
