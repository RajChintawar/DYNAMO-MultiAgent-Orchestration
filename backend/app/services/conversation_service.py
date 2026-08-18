from sqlalchemy.orm import Session

from app.db.models import Conversation, Message
from app.schemas.conversation import ConversationCreate


def add_message(db: Session, conversation_id: str, sender: str, text: str) -> Message:
    message = Message(
        conversation_id=conversation_id,
        sender=sender,
        text=text,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def get_messages(db: Session, conversation_id: str) -> list[Message]:
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.pk)
        .all()
    )


def create_conversation(db: Session, data: ConversationCreate) -> Conversation:
    conversation = Conversation(title=data.title)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


def get_conversations(db: Session) -> list[Conversation]:
    return db.query(Conversation).order_by(Conversation.pk).all()


def get_conversation(db: Session, conversation_id: str) -> Conversation | None:
    return db.query(Conversation).filter(Conversation.id == conversation_id).first()
