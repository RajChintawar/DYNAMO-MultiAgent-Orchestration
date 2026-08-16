from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import process_chat


router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"],
)


@router.post("/", response_model=ChatResponse)
def send_message(request: ChatRequest):

    return process_chat(request)