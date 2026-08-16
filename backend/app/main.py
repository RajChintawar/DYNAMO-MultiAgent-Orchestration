from fastapi import FastAPI

from app.api.routes.chat import router as chat_router


app = FastAPI(
    title="DYNAMO Backend",
    description="Backend API for the DYNAMO Multi-Agent Orchestration System",
    version="1.0.0",
)


app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "DYNAMO Backend is running",
        "status": "success",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }