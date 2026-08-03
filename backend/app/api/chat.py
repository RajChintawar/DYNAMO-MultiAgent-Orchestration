from fastapi import APIRouter

from app.models.request import ChatRequest
from app.models.response import ChatResponse
from app.services.chat_service import ChatService

router = APIRouter()


@router.post("/chat", response_model=ChatResponse, tags=["Chat"])
async def chat(request: ChatRequest):
    return ChatService.generate_response(request)