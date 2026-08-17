import uuid

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.conversation_service import add_message


def process_chat(request: ChatRequest) -> ChatResponse:

    execution_id = str(uuid.uuid4())

    add_message(
        conversation_id=request.conversation_id,
        sender="user",
        text=request.message,
    )

    return ChatResponse(
        conversation_id=request.conversation_id,
        execution_id=execution_id,
        message="Message received by DYNAMO backend.",
        status="accepted",
    )