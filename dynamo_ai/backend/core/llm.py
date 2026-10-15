
from langchain_groq import ChatGroq
from groq import Groq
import instructor

from .config import settings


def get_chat_llm(temperature: float = 0.1, max_tokens: int = 2048) -> ChatGroq:
    """Return a LangChain-compatible Groq LLM."""
    return ChatGroq(
        api_key=settings.GROQ_API_KEY,
        model=settings.GROQ_MODEL,
        temperature=temperature,
        reasoning_effort="low",
        model_kwargs={
            "max_completion_tokens": max_tokens,
            "include_reasoning": False,
        },
    )


def get_instructor_client():
    """Return an Instructor-patched Groq client for structured output."""
    raw_client = Groq(
        api_key=settings.GROQ_API_KEY,
        timeout=30,
        max_retries=1,
    )
    return instructor.from_groq(raw_client, mode=instructor.Mode.JSON)
