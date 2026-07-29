from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router

app = FastAPI(
    title="DYNAMO Backend",
    version="1.0.0",
    description="DYNAMO Multi-Agent Orchestration Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)

@app.get("/", tags=["Root"])
async def root():
    return {
        "project": "DYNAMO Backend",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }