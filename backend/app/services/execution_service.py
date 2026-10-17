from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.db.models import Execution, ExecutionEvent
from app.schemas.execution import ExecutionCreate, ExecutionEventCreate


def create_execution(db: Session, data: ExecutionCreate) -> Execution:
    execution = Execution(
        conversation_id=data.conversation_id,
        status="pending",
    )
    db.add(execution)
    db.commit()
    db.refresh(execution)
    return execution


def get_execution(db: Session, execution_id: str) -> Execution | None:
    return db.query(Execution).filter(Execution.id == execution_id).first()


def get_executions_for_conversation(db: Session, conversation_id: str) -> list[Execution]:
    return (
        db.query(Execution)
        .filter(Execution.conversation_id == conversation_id)
        .order_by(Execution.pk)
        .all()
    )



def update_execution_status(
    db: Session,
    execution_id: str,
    status: str,
    final_response: str | None = None,
    total_tokens: int | None = None,
    latency_ms: float | None = None,
    confidence: float | None = None,
    selected_policy: str | None = None,
    agents_used: str | None = None,
) -> Execution | None:
    execution = get_execution(db, execution_id)
    if execution is None:
        return None

    execution.status = status

    if final_response is not None:
        execution.final_response = final_response
    if total_tokens is not None:
        execution.total_tokens = total_tokens
    if latency_ms is not None:
        execution.latency_ms = latency_ms
    if confidence is not None:
        execution.confidence = confidence
    if selected_policy is not None:
        execution.selected_policy = selected_policy
    if agents_used is not None:
        execution.agents_used = agents_used

    if status in ("completed", "failed"):
        execution.completed_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(execution)
    return execution


def add_execution_event(db: Session, data: ExecutionEventCreate) -> ExecutionEvent:
    """Append-only — events are never updated or deleted, only inserted."""
    event = ExecutionEvent(
        execution_id=data.execution_id,
        agent=data.agent,
        event=data.event,
        status=data.status,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def get_execution_events(db: Session, execution_id: str) -> list[ExecutionEvent]:
    return (
        db.query(ExecutionEvent)
        .filter(ExecutionEvent.execution_id == execution_id)
        .order_by(ExecutionEvent.pk)
        .all()
    )
