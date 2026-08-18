from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.conversation import ConversationCreate, ConversationResponse
from app.schemas.message import MessageResponse

from app.services.conversation_service import (
    create_conversation,
    get_conversations,
    get_conversation,
    get_messages,
)

router = APIRouter(
    prefix="/api/conversations",
    tags=["Conversations"],
)


@router.post("/", response_model=ConversationResponse)
def create_new_conversation(data: ConversationCreate, db: Session = Depends(get_db)):
    return create_conversation(db, data)


@router.get("/", response_model=list[ConversationResponse])
def list_conversations(db: Session = Depends(get_db)):
    return get_conversations(db)


@router.get("/{conversation_id}/messages", response_model=list[MessageResponse])
def get_conversation_messages(conversation_id: str, db: Session = Depends(get_db)):
    return get_messages(db, conversation_id)


@router.get("/{conversation_id}", response_model=ConversationResponse)
def get_single_conversation(conversation_id: str, db: Session = Depends(get_db)):
    conversation = get_conversation(db, conversation_id)

    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")

    return conversation
