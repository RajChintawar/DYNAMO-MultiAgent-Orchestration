from sqlalchemy.orm import Session

from app.schemas.chat import ChatRequest, ChatResponse
from app.schemas.execution import ExecutionCreate
from app.services.conversation_service import add_message
from app.services.execution_service import create_execution


def process_chat(db: Session, request: ChatRequest) -> ChatResponse:
    # Persist the user's message
    add_message(
        db,
        conversation_id=request.conversation_id,
        sender="user",
        text=request.message,
    )

    # Create a tracked execution row (status starts "pending"; the
    # orchestrator pipeline will update it via update_execution_status()
    # and log its steps via add_execution_event() as it runs)
    execution = create_execution(
        db,
        ExecutionCreate(conversation_id=request.conversation_id),
    )

    return ChatResponse(
        conversation_id=request.conversation_id,
        execution_id=execution.id,
        message="Message received by DYNAMO backend.",
        status="accepted",
    )
