import uuid
from datetime import datetime, timezone

from app.schemas.execution import (
    ExecutionCreate,
    ExecutionResponse,
)


executions = []


def create_execution(
    data: ExecutionCreate,
) -> ExecutionResponse:

    execution = ExecutionResponse(
        id=str(uuid.uuid4()),
        conversation_id=data.conversation_id,
        status="pending",
        started_at=datetime.now(timezone.utc),
    )

    executions.append(execution)

    return execution


def get_execution(
    execution_id: str,
) -> ExecutionResponse | None:

    for execution in executions:

        if execution.id == execution_id:
            return execution

    return None