from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.chat import router as chat_router
from app.api.routes.conversations import router as conversation_router
from app.api.routes.executions import router as execution_router


app = FastAPI(
    title="DYNAMO Backend",
    description="Backend API for the DYNAMO Multi-Agent Orchestration System",
    version="1.0.0",
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat_router)
app.include_router(conversation_router)
app.include_router(execution_router)


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