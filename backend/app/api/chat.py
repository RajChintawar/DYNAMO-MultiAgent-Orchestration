from fastapi import APIRouter
from app.models.request import ChatRequest
from app.models.response import ChatResponse

router = APIRouter()


@router.post("/chat", response_model=ChatResponse, tags=["Chat"])
async def chat(request: ChatRequest):
    return ChatResponse(
        response=f"You said: {request.message}",
        status="success"
    )