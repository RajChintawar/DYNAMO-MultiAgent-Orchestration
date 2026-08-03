from app.models.request import ChatRequest
from app.models.response import ChatResponse


class ChatService:

    @staticmethod
    def generate_response(request: ChatRequest) -> ChatResponse:
        return ChatResponse(
            response=f"You said: {request.message}",
            status="success"
        )