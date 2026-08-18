from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ConversationCreate(BaseModel):
    title: str = "New Conversation"


class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    created_at: datetime
