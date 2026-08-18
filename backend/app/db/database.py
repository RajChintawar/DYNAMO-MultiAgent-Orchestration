"""
Database engine & session setup.

Default: SQLite file (dynamo.db) — zero setup, good enough for the academic
project timeline and single-process dev/demo use.

To move to Postgres later (e.g. for a real multi-user deployment), just set
DATABASE_URL in .env, e.g.:
    DATABASE_URL=postgresql+psycopg2://user:pass@localhost:5432/dynamo
No other code changes needed — SQLAlchemy handles the dialect switch.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dynamo.db")

# check_same_thread=False is required for SQLite when used with FastAPI's
# threaded request handling. Not needed (and not passed) for Postgres/MySQL.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency — yields a DB session per request, closes it after."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Create all tables. Called once on app startup."""
    # Import models here so they're registered on Base before create_all runs.
    from app.db import models  # noqa: F401
    Base.metadata.create_all(bind=engine)
