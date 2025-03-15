import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials

# Load environment variables from .env
load_dotenv()

# Firebase Initialization
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH"))  # Add this path in .env
firebase_admin.initialize_app(cred)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    DEBUG = os.getenv("DEBUG", "True") == "True"
