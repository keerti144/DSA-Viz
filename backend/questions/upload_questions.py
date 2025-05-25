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

def upload_questions_from_file(json_path):
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Handle both direct list of questions and wrapped questions object
            questions = data.get('questions', data) if isinstance(data, dict) else data
    except Exception as e:
        print(f"❌ Failed to load JSON file {json_path}:", e)
        return 0, 0

    print(f"\n🔄 Uploading questions from {os.path.basename(json_path)}...")
    print(f"📝 Found {len(questions)} questions...")

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

    print(f"✅ Done with {os.path.basename(json_path)}: {uploaded} uploaded, {skipped} skipped.")
    return uploaded, skipped

def upload_questions():
    # Get all JSON files in the questions directory
    questions_dir = os.path.dirname(__file__)
    json_files = [f for f in os.listdir(questions_dir) if f.endswith('.json')]
    
    if not json_files:
        print("❌ No JSON files found in the questions directory!")
        return

    total_uploaded = 0
    total_skipped = 0

    for json_file in json_files:
        json_path = os.path.join(questions_dir, json_file)
        uploaded, skipped = upload_questions_from_file(json_path)
        total_uploaded += uploaded
        total_skipped += skipped

    print(f"\n📊 Summary:")
    print(f"Total questions uploaded: {total_uploaded}")
    print(f"Total questions skipped: {total_skipped}")
    print(f"Total questions processed: {total_uploaded + total_skipped}")

if __name__ == "__main__":
    upload_questions()
