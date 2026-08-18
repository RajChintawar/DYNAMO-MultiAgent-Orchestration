from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.execution import (
    ExecutionCreate,
    ExecutionResponse,
    ExecutionEventCreate,
    ExecutionEventResponse,
)

from app.services.execution_service import (
    create_execution,
    get_execution,
    get_executions_for_conversation,
    add_execution_event,
    get_execution_events,
)


router = APIRouter(
    prefix="/api/executions",
    tags=["Executions"],
)


@router.post("/", response_model=ExecutionResponse)
def start_execution(data: ExecutionCreate, db: Session = Depends(get_db)):
    return create_execution(db, data)


@router.get("/{execution_id}", response_model=ExecutionResponse)
def get_execution_status(execution_id: str, db: Session = Depends(get_db)):
    execution = get_execution(db, execution_id)

    if execution is None:
        raise HTTPException(status_code=404, detail="Execution not found")

    return execution


@router.get("/by-conversation/{conversation_id}", response_model=list[ExecutionResponse])
def list_executions_for_conversation(conversation_id: str, db: Session = Depends(get_db)):
    return get_executions_for_conversation(db, conversation_id)


@router.post("/{execution_id}/events", response_model=ExecutionEventResponse)
def log_execution_event(execution_id: str, data: ExecutionEventCreate, db: Session = Depends(get_db)):
    if data.execution_id != execution_id:
        raise HTTPException(status_code=400, detail="execution_id mismatch between path and body")
    return add_execution_event(db, data)


@router.get("/{execution_id}/events", response_model=list[ExecutionEventResponse])
def list_execution_events(execution_id: str, db: Session = Depends(get_db)):
    return get_execution_events(db, execution_id)
