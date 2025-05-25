import sys
import os
from firebase_admin import firestore

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from config import db

def verify_arrays_hard_interview():
    print("Fetching questions with topic='arrays', difficulty='hard', type='interview'...")
    questions_ref = db.collection("questions")
    query = questions_ref.where("topic", "==", "arrays") \
                        .where("difficulty", "==", "hard") \
                        .where("type", "==", "interview")
    results = query.get()
    print(f"Found {len(results)} questions.")
    for doc in results:
        data = doc.to_dict()
        print(f"- {data.get('question', '')[:100]}")

if __name__ == "__main__":
    verify_arrays_hard_interview() 