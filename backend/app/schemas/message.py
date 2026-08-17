from pydantic import BaseModel


class MessageCreate(BaseModel):
    conversation_id: str
    sender: str
    text: str


class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender: str
    text: str