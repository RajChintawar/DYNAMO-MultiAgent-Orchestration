from pydantic import BaseModel


class ChatRequest(BaseModel):
    conversation_id: str
    message: str


class ChatResponse(BaseModel):
    conversation_id: str
    execution_id: str
    message: str
    status: str