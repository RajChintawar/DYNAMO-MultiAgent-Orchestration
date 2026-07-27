from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

class Settings:
    PROJECT_NAME = os.getenv("PROJECT_NAME", "DYNAMO Backend")
    PROJECT_VERSION = os.getenv("PROJECT_VERSION", "1.0.0")
    HOST = os.getenv("HOST", "127.0.0.1")
    PORT = int(os.getenv("PORT", 8000))

# Create one settings object
settings = Settings()