import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials

# Load environment variables from .env
load_dotenv()

# Configuration Class
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")  # Default value if missing
    DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1")  # Converts string to boolean
    FIREBASE_CREDENTIALS_PATH = os.getenv("FIREBASE_CREDENTIALS_PATH")

    # Ensure the credentials file exists
    if not FIREBASE_CREDENTIALS_PATH or not os.path.exists(FIREBASE_CREDENTIALS_PATH):
        raise FileNotFoundError(f"Firebase credentials file not found: {FIREBASE_CREDENTIALS_PATH}")

# Firebase Initialization (Only initialize if not already initialized)
if not firebase_admin._apps:
    cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)
