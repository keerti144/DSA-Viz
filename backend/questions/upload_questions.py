import sys
import os
import json
import hashlib
from firebase_admin import firestore

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from config import db  # ✅ Import db from your existing config

def generate_question_id(question):
    # Create a consistent string representation of the question
    question_str = f"{question['question']}{question.get('type', '')}{question.get('topic', '')}"
    # Use SHA-256 hash which is consistent across runs and machines
    return hashlib.sha256(question_str.encode()).hexdigest()

def upload_questions():
    json_path = os.path.join(os.path.dirname(__file__), "questions.json")

    try:
        with open(json_path, "r", encoding="utf-8") as f:
            questions = json.load(f)
    except Exception as e:
        print("❌ Failed to load JSON file:", e)
        return

    print(f"🔄 Uploading {len(questions)} questions...")

    uploaded, skipped = 0, 0

    for question in questions:
        question_id = generate_question_id(question)
        doc_ref = db.collection("questions").document(question_id)

        if not doc_ref.get().exists:
            question["createdAt"] = firestore.SERVER_TIMESTAMP
            question["updatedAt"] = firestore.SERVER_TIMESTAMP
            doc_ref.set(question)
            print(f"✅ Uploaded: {question['question'][:50]}...")
            uploaded += 1
        else:
            print(f"⚠️ Skipped duplicate: {question['question'][:50]}...")
            skipped += 1

    print(f"\n✅ Done: {uploaded} uploaded, {skipped} skipped.")

if __name__ == "__main__":
    upload_questions()
