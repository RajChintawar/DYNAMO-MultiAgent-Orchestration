import uuid

from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
)


conversations = []
messages = []


def add_message(
    conversation_id: str,
    sender: str,
    text: str,
):

    message = {
        "id": str(uuid.uuid4()),
        "conversation_id": conversation_id,
        "sender": sender,
        "text": text,
    }

    messages.append(message)

    return message



def create_conversation(
    data: ConversationCreate,
) -> ConversationResponse:

    conversation = ConversationResponse(
        id=str(uuid.uuid4()),
        title=data.title,
    )

    conversations.append(conversation)

    return conversation


def get_conversations() -> list[ConversationResponse]:

    return conversations


def get_conversation(
    conversation_id: str,
) -> ConversationResponse | None:

    for conversation in conversations:

        if conversation.id == conversation_id:
            return conversation

    return None