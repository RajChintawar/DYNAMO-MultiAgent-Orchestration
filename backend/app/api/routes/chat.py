
from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import process_chat

router = APIRouter(prefix="/api/chat", tags=["Chat"])


@router.post("/", response_model=ChatResponse)
def send_message(
    request: ChatRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    return process_chat(db, request, background_tasks)
