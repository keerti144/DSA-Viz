import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# Load environment variables from .env
load_dotenv()

# Configuration Class
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")  # Default value if missing
    DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1")  # Converts string to boolean
    FIREBASE_CREDENTIALS_PATH = "firebase_key.json"  # Use the local file directly
    FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")

# Firebase Initialization (Only initialize if not already initialized)
if not firebase_admin._apps:
    cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)

# Create Firestore client
db = firestore.client()