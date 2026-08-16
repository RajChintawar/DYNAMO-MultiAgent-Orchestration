import uuid

from app.schemas.chat import ChatRequest, ChatResponse


def process_chat(request: ChatRequest) -> ChatResponse:

    execution_id = str(uuid.uuid4())

    return ChatResponse(
        conversation_id=request.conversation_id,
        execution_id=execution_id,
        message="Message received by DYNAMO backend.",
        status="accepted",
    )