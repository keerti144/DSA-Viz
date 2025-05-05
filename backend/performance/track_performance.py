from firebase_admin import firestore
from config import Config
import firebase_admin
from firebase_admin import credentials,db

def update_user_performance(uid, topic, is_correct, points_awarded):
    user_ref = db.collection("users").document(uid)
    user_doc = user_ref.get()

    if not user_doc.exists:
        print(f"User {uid} not found.")
        return

    user_data = user_doc.to_dict()
    performance = user_data.get("performance", {})

    if topic not in performance:
        # Initialize topic performance
        performance[topic] = {
            "totalQuestions": 0,
            "correctAnswers": 0,
            "totalPoints": 0,
            "accuracy": 0
        }

    # Update the topic performance
    topic_data = performance[topic]
    topic_data["totalQuestions"] += 1
    if is_correct:
        topic_data["correctAnswers"] += 1
        topic_data["totalPoints"] += points_awarded

    # Calculate accuracy
    topic_data["accuracy"] = round(
        (topic_data["correctAnswers"] / topic_data["totalQuestions"]) * 100, 2
    )

    # Save back to Firestore
    performance[topic] = topic_data
    user_ref.update({"performance": performance})

    print(f"Updated performance for user {uid} on topic {topic}")
