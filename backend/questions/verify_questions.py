import sys
import os
import json
import hashlib
from firebase_admin import firestore

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from config import db

def generate_question_id(question):
    # Create a consistent string representation of the question
    question_str = f"{question['question']}{question.get('type', '')}{question.get('topic', '')}"
    # Use SHA-256 hash which is consistent across runs and machines
    return hashlib.sha256(question_str.encode()).hexdigest()

def verify_questions():
    # Load questions from JSON file
    json_path = os.path.join(os.path.dirname(__file__), "questions.json")
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            json_questions = json.load(f)
    except Exception as e:
        print("❌ Failed to load JSON file:", e)
        return

    # Get all questions from Firebase
    try:
        firestore_questions = db.collection("questions").get()
        firestore_questions_dict = {doc.id: doc.to_dict() for doc in firestore_questions}
    except Exception as e:
        print("❌ Failed to fetch questions from Firebase:", e)
        return

    # Create a dictionary of JSON questions using the same ID generation method
    json_questions_dict = {
        generate_question_id(q): q 
        for q in json_questions
    }

    # Compare counts
    print(f"\n📊 Question Counts:")
    print(f"JSON file: {len(json_questions)} questions")
    print(f"Firebase: {len(firestore_questions_dict)} questions")

    # Find missing questions
    missing_questions = []
    for q_id, q in json_questions_dict.items():
        if q_id not in firestore_questions_dict:
            missing_questions.append(q)

    # Find extra questions in Firebase
    extra_questions = []
    for q_id in firestore_questions_dict:
        if q_id not in json_questions_dict:
            extra_questions.append(firestore_questions_dict[q_id])

    # Print results
    if missing_questions:
        print(f"\n❌ Found {len(missing_questions)} questions in JSON that are not in Firebase:")
        for q in missing_questions[:5]:  # Show first 5 missing questions
            print(f"- {q['question'][:100]}...")
        if len(missing_questions) > 5:
            print(f"... and {len(missing_questions) - 5} more")
    else:
        print("\n✅ All JSON questions are present in Firebase!")

    if extra_questions:
        print(f"\n⚠️ Found {len(extra_questions)} questions in Firebase that are not in JSON:")
        for q in extra_questions[:5]:  # Show first 5 extra questions
            print(f"- {q['question'][:100]}...")
        if len(extra_questions) > 5:
            print(f"... and {len(extra_questions) - 5} more")
    else:
        print("\n✅ No extra questions found in Firebase!")

    # Print topic distribution
    print("\n📊 Topic Distribution in JSON:")
    topics_json = {}
    for q in json_questions:
        topic = q.get('topic', 'unknown')
        topics_json[topic] = topics_json.get(topic, 0) + 1
    for topic, count in sorted(topics_json.items()):
        print(f"{topic}: {count} questions")

    print("\n📊 Topic Distribution in Firebase:")
    topics_firebase = {}
    for q in firestore_questions_dict.values():
        topic = q.get('topic', 'unknown')
        topics_firebase[topic] = topics_firebase.get(topic, 0) + 1
    for topic, count in sorted(topics_firebase.items()):
        print(f"{topic}: {count} questions")

if __name__ == "__main__":
    verify_questions() 