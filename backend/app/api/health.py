from fastapi import APIRouter

router = APIRouter()

@router.get("/health", tags=["Health"])
async def health_check():
    return {
  "status": "healthy",
  "service": "DYNAMO Backend",
  "version": "1.0.0"
}