"""
ORM models for DYNAMO persistence — implements the schema proposed in
the Database Integration Contract:

Conversation 1---* Message
Conversation 1---* Execution 1---* ExecutionEvent

Design decisions (answers to the contract's open questions):
- IDs: every table has TWO id-like columns.
    * `pk`  — internal auto-increment integer primary key (DB-generated).
              Used only for guaranteed insertion-order sorting. Never
              exposed via the API.
    * `id`  — backend-generated UUID4 string, unique + indexed. This is
              the public ID returned in API responses, matching the
              existing in-memory service code (str(uuid.uuid4())) so the
              frontend contract doesn't change.
  Reason for both: SQLite/Postgres only auto-increment a real integer
  PRIMARY KEY, and UUIDs give no reliable insertion order — so `pk` gives
  stable ordering while `id` stays an opaque, non-guessable public key.
- Ordering: Message and ExecutionEvent are always fetched
  `ORDER BY pk ASC` — this is the tie-breaker guarantee, not created_at
  (two events can share the same millisecond timestamp).
- Events are immutable: ExecutionEvent has no update path in the service
  layer — only inserts. Treat it as an append-only log.
- Cascade delete: deleting a Conversation deletes its Messages and
  Executions; deleting an Execution deletes its ExecutionEvents.
- Timestamps: stored timezone-aware UTC (DateTime(timezone=True)), set
  via Python's datetime.now(timezone.utc) — avoids relying on the DB
  server's local timezone.
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Column, String, Text, DateTime, ForeignKey, Integer,
)
from sqlalchemy.orm import relationship

from app.db.database import Base


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class Conversation(Base):
    __tablename__ = "conversations"

    pk = Column(Integer, primary_key=True, autoincrement=True)
    id = Column(String(36), unique=True, index=True, nullable=False, default=_uuid)
    title = Column(String(255), nullable=False, default="New Conversation")
    created_at = Column(DateTime(timezone=True), default=_now, nullable=False)

    messages = relationship(
        "Message", back_populates="conversation",
        cascade="all, delete-orphan", order_by="Message.pk",
    )
    executions = relationship(
        "Execution", back_populates="conversation",
        cascade="all, delete-orphan", order_by="Execution.pk",
    )


class Message(Base):
    __tablename__ = "messages"

    pk = Column(Integer, primary_key=True, autoincrement=True)
    id = Column(String(36), unique=True, index=True, nullable=False, default=_uuid)
    conversation_id = Column(String(36), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    sender = Column(String(32), nullable=False)   # "user" | "assistant" | "system"
    text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), default=_now, nullable=False)

    conversation = relationship("Conversation", back_populates="messages")


class Execution(Base):
    __tablename__ = "executions"

    STATUSES = ("pending", "running", "completed", "failed")

    pk = Column(Integer, primary_key=True, autoincrement=True)
    id = Column(String(36), unique=True, index=True, nullable=False, default=_uuid)
    conversation_id = Column(String(36), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String(20), nullable=False, default="pending")
    started_at = Column(DateTime(timezone=True), default=_now, nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    final_response = Column(Text, nullable=True)

    conversation = relationship("Conversation", back_populates="executions")
    events = relationship(
        "ExecutionEvent", back_populates="execution",
        cascade="all, delete-orphan", order_by="ExecutionEvent.pk",
    )


class ExecutionEvent(Base):
    __tablename__ = "execution_events"

    STATUSES = ("started", "in_progress", "completed", "failed")

    pk = Column(Integer, primary_key=True, autoincrement=True)
    id = Column(String(36), unique=True, index=True, nullable=False, default=_uuid)
    execution_id = Column(String(36), ForeignKey("executions.id", ondelete="CASCADE"), nullable=False, index=True)
    agent = Column(String(64), nullable=False)     # e.g. "orchestrator", "market_agent"
    event = Column(String(64), nullable=False)     # e.g. "spawned", "tool_call", "output"
    status = Column(String(20), nullable=False, default="started")
    timestamp = Column(DateTime(timezone=True), default=_now, nullable=False)

    execution = relationship("Execution", back_populates="events")
