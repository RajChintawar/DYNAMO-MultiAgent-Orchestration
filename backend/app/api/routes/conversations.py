from fastapi import APIRouter, HTTPException

from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
)

from app.services.conversation_service import (
    create_conversation,
    get_conversations,
    get_conversation,
    messages,
)

router = APIRouter(
    prefix="/api/conversations",
    tags=["Conversations"],
)


@router.post(
    "/",
    response_model=ConversationResponse,
)
def create_new_conversation(
    data: ConversationCreate,
):

    return create_conversation(data)


@router.get(
    "/",
    response_model=list[ConversationResponse],
)
def list_conversations():

    return get_conversations()

@router.get(
    "/{conversation_id}/messages",
)
def get_conversation_messages(
    conversation_id: str,
):

    return [
        message
        for message in messages
        if message["conversation_id"] == conversation_id
    ]


@router.get(
    "/{conversation_id}",
    response_model=ConversationResponse,
)
def get_single_conversation(
    conversation_id: str,
):

    conversation = get_conversation(conversation_id)

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return conversation