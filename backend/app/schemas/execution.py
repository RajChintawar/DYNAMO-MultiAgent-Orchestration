from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ExecutionCreate(BaseModel):
    conversation_id: str


class ExecutionResponse(BaseModel):
    id: str
    conversation_id: str
    status: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    final_response: Optional[str] = None