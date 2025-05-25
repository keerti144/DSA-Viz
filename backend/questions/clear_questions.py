import sys
import os
from firebase_admin import firestore

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from config import db

def clear_questions():
    try:
        # Get all questions
        questions = db.collection("questions").get()
        
        # Delete each question
        deleted = 0
        for doc in questions:
            doc.reference.delete()
            deleted += 1
            
        print(f"✅ Successfully deleted {deleted} questions from Firebase")
    except Exception as e:
        print(f"❌ Error deleting questions: {e}")

if __name__ == "__main__":
    clear_questions() 