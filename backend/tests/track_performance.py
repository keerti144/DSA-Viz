from firebase_admin import firestore
from config import Config
import firebase_admin
from firebase_admin import credentials,db

def update_user_performance(uid, topic, is_correct, points_awarded):
    user_ref = db.collection("users").document(uid)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return False, f"User {uid} not found."

    user_data = user_doc.to_dict()
    performance = user_data.get("performance", {})

    if topic not in performance:
        performance[topic] = {
            "totalQuestions": 0,
            "correctAnswers": 0,
            "totalPoints": 0,
            "accuracy": 0
        }

    topic_stats = performance[topic]
    topic_stats["totalQuestions"] += 1
    if is_correct:
        topic_stats["correctAnswers"] += 1
        topic_stats["totalPoints"] += points_awarded

    topic_stats["accuracy"] = round(
        (topic_stats["correctAnswers"] / topic_stats["totalQuestions"]) * 100, 2
    )

    performance[topic] = topic_stats
    user_ref.update({"performance": performance})

    return True, f"Performance updated for user {uid} on topic {topic}"
