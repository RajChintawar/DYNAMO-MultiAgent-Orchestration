from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class ExecutionCreate(BaseModel):
    conversation_id: str


class ExecutionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    conversation_id: str
    status: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    final_response: Optional[str] = None


class ExecutionEventCreate(BaseModel):
    execution_id: str
    agent: str
    event: str
    status: str = "started"


class ExecutionEventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    execution_id: str
    agent: str
    event: str
    status: str
    timestamp: datetime
