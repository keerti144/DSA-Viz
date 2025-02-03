import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase credentials from JSON file
cred = credentials.Certificate("backend/firebase-admin-sdk.json")  # Adjust path as needed
firebase_admin.initialize_app(cred)

# Initialize Firestore database
db = firestore.client()