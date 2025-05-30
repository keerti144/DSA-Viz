import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

# Load environment variables from .env
load_dotenv()

# Configuration Class
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
    DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1")
    FIREBASE_CREDENTIALS_PATH = os.path.join(os.path.dirname(__file__), "firebase_key.json")  # Use absolute path
    FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")
    
    # Groq API Configuration
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    
    # Email Configuration
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True").lower() in ("true", "1")
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", "officialkeerti14@gmail.com")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "officialkeerti14@gmail.com")

# Firebase Initialization (Only initialize if not already initialized)
if not firebase_admin._apps:
    if os.path.exists(Config.FIREBASE_CREDENTIALS_PATH):
        cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
        firebase_admin.initialize_app(cred)
    else:
        raise ValueError(f"Firebase credentials file not found at {Config.FIREBASE_CREDENTIALS_PATH}")

# Create Firestore client
db = firestore.client()