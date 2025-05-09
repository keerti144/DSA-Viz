from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from app import db
from datetime import datetime
import logging
import traceback
import ast
import re

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

routes_bp = Blueprint("routes", __name__)  # Blueprint for API routes

@routes_bp.route("/")
def home():
    return "Hello, World!"

@routes_bp.route("/api/user/<uid>/performance", methods=['GET'])
def get_user_performance(uid):
    try:
        logger.debug(f"Fetching performance for user: {uid}")
        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            logger.debug(f"Creating new user document for: {uid}")
            user_data = {
                "performance": {},
                "overall_stats": {
                    "totalQuestions": 0,
                    "correctAnswers": 0,
                    "totalPoints": 0,
                    "currentStreak": 0,
                    "longestStreak": 0,
                    "lastAttemptDate": None
                },
                "attempt_history": []
            }
            user_ref.set(user_data)
            return jsonify(user_data), 200

        user_data = user_doc.to_dict()
        logger.debug(f"User data: {user_data}")
        return jsonify(user_data), 200
    except Exception as e:
        logger.error(f"Error in get_user_performance: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500

@routes_bp.route("/api/leaderboard", methods=['GET'])
def get_leaderboard():
    try:
        logger.debug("Fetching leaderboard data")
        users_ref = db.collection("users")
        users = users_ref.stream()
        
        leaderboard_data = []
        for user in users:
            user_data = user.to_dict()
            if "overall_stats" in user_data:
                leaderboard_data.append({
                    "user_id": user.id,
                    "username": user_data.get("username", "Anonymous"),
                    "level": user_data.get("level", 1),
                    "xp_points": user_data.get("overall_stats", {}).get("totalPoints", 0)
                })
        
        # Sort by XP points in descending order
        leaderboard_data.sort(key=lambda x: x["xp_points"], reverse=True)
        logger.debug(f"Leaderboard data: {leaderboard_data}")
        return jsonify(leaderboard_data), 200
    except Exception as e:
        logger.error(f"Error in get_leaderboard: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500

@routes_bp.route("/submit-answer", methods=['POST'])
def submit_answer():
    try:
        data = request.get_json()
        uid = data.get('uid')
        question_id = data.get('question_id')
        selected_option = data.get('selected_option')
        
        if not all([uid, question_id, selected_option]):
            return jsonify({'error': 'Missing required fields'}), 400
            
        # Get question data from Firestore
        question_ref = db.collection('questions').document(question_id)
        question_doc = question_ref.get()
        
        if not question_doc.exists:
            return jsonify({'error': 'Question not found'}), 404
            
        question_data = question_doc.to_dict()
        
        # Get the correct answer based on question type
        question_type = question_data.get('type')
        correct_answer = question_data.get('expected_answer') or question_data.get('answer')
            
        if not correct_answer:
            return jsonify({'error': 'Question has no answer field'}), 400
            
        # Evaluate answer based on question type
        is_correct = False
        if question_type == 'coding':
            # For coding questions, check for syntax errors
            try:
                # Basic syntax check
                compile(selected_option, '<string>', 'exec')
                is_correct = True
            except SyntaxError:
                is_correct = False
        elif question_type == 'interview':
            # For interview questions, use keyword matching
            selected_option = selected_option.lower()
            correct_answer = correct_answer.lower()
            keywords = [word for word in correct_answer.split() if len(word) > 3]
            matches = sum(1 for keyword in keywords if keyword in selected_option)
            is_correct = matches >= len(keywords) * 0.7  # 70% keyword match required
        else:  # MCQ questions
            # For MCQ, use exact string comparison
            is_correct = selected_option.strip().lower() == correct_answer.strip().lower()
            
        # Get user document
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            # Initialize user document if it doesn't exist
            user_data = {
                "performance": {},
                "overall_stats": {
                    "totalQuestions": 0,
                    "correctAnswers": 0,
                    "totalPoints": 0,
                    "currentStreak": 0,
                    "longestStreak": 0,
                    "lastAttemptDate": None
                },
                "attempt_history": []
            }
            user_ref.set(user_data)
            user_doc = user_ref.get()
            
        user_data = user_doc.to_dict()
        
        # Initialize performance tracking if it doesn't exist
        if "performance" not in user_data:
            user_data["performance"] = {}
            
        if "overall_stats" not in user_data:
            user_data["overall_stats"] = {
                "totalQuestions": 0,
                "correctAnswers": 0,
                "totalPoints": 0,
                "currentStreak": 0,
                "longestStreak": 0,
                "lastAttemptDate": None
            }
            
        if "attempt_history" not in user_data:
            user_data["attempt_history"] = []

        performance = user_data["performance"]
        overall_stats = user_data["overall_stats"]

        # Get topic from question data
        topic = question_data.get('topic', 'general').title()
        
        # Update stats for this topic
        if topic not in performance:
            performance[topic] = {
                "totalQuestions": 0,
                "correctAnswers": 0,
                "totalPoints": 0,
                "accuracy": 0,
                "byDifficulty": {
                    "easy": {"attempted": 0, "correct": 0},
                    "medium": {"attempted": 0, "correct": 0},
                    "hard": {"attempted": 0, "correct": 0}
                }
            }

        topic_stats = performance[topic]
        difficulty = question_data.get('difficulty', 'medium').lower()

        # Update topic-specific stats
        topic_stats["totalQuestions"] += 1
        if is_correct:
            topic_stats["correctAnswers"] += 1
            topic_stats["totalPoints"] += question_data.get('points', 10)
        
        # Update difficulty-specific stats
        topic_stats["byDifficulty"][difficulty]["attempted"] += 1
        if is_correct:
            topic_stats["byDifficulty"][difficulty]["correct"] += 1

        topic_stats["accuracy"] = round(
            (topic_stats["correctAnswers"] / topic_stats["totalQuestions"]) * 100
        )

        # Update overall stats
        overall_stats["totalQuestions"] += 1
        if is_correct:
            overall_stats["correctAnswers"] += 1
            overall_stats["totalPoints"] += question_data.get('points', 10)
            overall_stats["currentStreak"] += 1
            overall_stats["longestStreak"] = max(
                overall_stats["longestStreak"],
                overall_stats["currentStreak"]
            )
        else:
            overall_stats["currentStreak"] = 0

        # Use current datetime for both Firestore and response
        current_time = datetime.now()
        overall_stats["lastAttemptDate"] = current_time

        # Add attempt to history
        attempt_history = user_data["attempt_history"]
        attempt_history.append({
            "question_id": question_id,
            "topic": topic,
            "difficulty": difficulty,
            "selected_option": selected_option,
            "is_correct": is_correct,
            "points_awarded": question_data.get('points', 10) if is_correct else 0,
            "timestamp": current_time
        })
        # Keep only last 100 attempts
        attempt_history = attempt_history[-100:]

        # Save all updates back to user
        user_ref.update({
            "performance": performance,
            "overall_stats": overall_stats,
            "attempt_history": attempt_history
        })
        
        # Create response data with ISO formatted timestamps
        response_data = {
            'correct': is_correct,
            'awardedPoints': question_data.get('points', 10) if is_correct else 0,
            'updatedPerformance': {
                **topic_stats,
                'lastAttemptDate': current_time.isoformat()
            },
            'overallStats': {
                **overall_stats,
                'lastAttemptDate': current_time.isoformat()
            }
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        logger.error(f"Error in submit_answer: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500
