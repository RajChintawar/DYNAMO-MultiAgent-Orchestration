from fastapi import APIRouter, HTTPException

from app.schemas.execution import (
    ExecutionCreate,
    ExecutionResponse,
)

from app.services.execution_service import (
    create_execution,
    get_execution,
)


router = APIRouter(
    prefix="/api/executions",
    tags=["Executions"],
)


@router.post(
    "/",
    response_model=ExecutionResponse,
)
def start_execution(
    data: ExecutionCreate,
):

    return create_execution(data)


@router.get(
    "/{execution_id}",
    response_model=ExecutionResponse,
)
def get_execution_status(
    execution_id: str,
):

    execution = get_execution(execution_id)

    if execution is None:
        raise HTTPException(
            status_code=404,
            detail="Execution not found",
        )

    return execution