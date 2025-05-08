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
        data = request.json
        logger.debug(f"Received data: {data}")
        uid = data.get("uid")
        question_id = data.get("question_id")
        selected_option = data.get("selected_option")

        if not all([uid, question_id, selected_option]):
            return jsonify({"error": "Missing fields"}), 400

        # Get question from Firestore using question_id as document ID
        question_ref = db.collection("questions").document(question_id)
        question_doc = question_ref.get()

        if not question_doc.exists:
            logger.error(f"Question not found: {question_id}")
            return jsonify({"error": "Question not found"}), 404

        question_data = question_doc.to_dict()
        logger.debug(f"Question data: {question_data}")
        correct_answer = question_data.get("answer")
        topic = question_data.get("topic")
        points = question_data.get("points", 0)
        difficulty = question_data.get("difficulty", "medium")

        logger.debug(f"Correct answer: {correct_answer}, Topic: {topic}, Points: {points}, Difficulty: {difficulty}")
        logger.debug(f"Selected option: {selected_option}")

        # Evaluate the answer based on question type
        try:
            if question_data.get("type") == "debugging":
                # For debugging questions, check if the submitted code runs successfully
                try:
                    # Extract code from the answer using regex
                    code_match = re.search(r'```(?:python)?\s*(.*?)\s*```', selected_option, re.DOTALL)
                    if code_match:
                        submitted_code = code_match.group(1)
                    else:
                        # If no code block found, use the entire answer
                        submitted_code = selected_option

                    # Parse the code to check for syntax errors
                    ast.parse(submitted_code)
                    
                    # If we get here, the code is syntactically valid
                    is_correct = True
                    logger.debug("Debugging answer evaluation - Code is syntactically valid")
                except SyntaxError as e:
                    logger.error(f"Syntax error in submitted code: {str(e)}")
                    is_correct = False
                except Exception as e:
                    logger.error(f"Error evaluating code: {str(e)}")
                    is_correct = False
            else:
                # For MCQ and interview questions, do exact string comparison
                is_correct = selected_option.strip().lower() == correct_answer.strip().lower()
                logger.debug(f"Standard answer evaluation - Correct: {is_correct}")
        except AttributeError as e:
            logger.error(f"Error comparing answers: {str(e)}")
            logger.error(f"selected_option type: {type(selected_option)}, value: {selected_option}")
            logger.error(f"correct_answer type: {type(correct_answer)}, value: {correct_answer}")
            return jsonify({"error": "Invalid answer format"}), 400

        awarded_points = points if is_correct else 0
        logger.debug(f"Answer evaluation - Correct: {is_correct}, Points awarded: {awarded_points}")

        # Get user document
        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()
        
        # Initialize user document if it doesn't exist
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
        else:
            user_data = user_doc.to_dict()
            logger.debug(f"User data before update: {user_data}")
            
            # Initialize performance tracking if it doesn't exist
            if "performance" not in user_data:
                logger.debug("Initializing performance tracking")
                user_data["performance"] = {}
                
            if "overall_stats" not in user_data:
                logger.debug("Initializing overall stats")
                user_data["overall_stats"] = {
                    "totalQuestions": 0,
                    "correctAnswers": 0,
                    "totalPoints": 0,
                    "currentStreak": 0,
                    "longestStreak": 0,
                    "lastAttemptDate": None
                }
                
            if "attempt_history" not in user_data:
                logger.debug("Initializing attempt history")
                user_data["attempt_history"] = []

        performance = user_data["performance"]
        overall_stats = user_data["overall_stats"]

        # Convert topic to title case to ensure consistency
        topic = topic.title()
        logger.debug(f"Using topic: {topic}")

        # Update stats for this topic
        if topic not in performance:
            logger.debug(f"Initializing stats for topic: {topic}")
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
        logger.debug(f"Topic stats before update: {topic_stats}")

        # Update topic-specific stats
        topic_stats["totalQuestions"] += 1
        if is_correct:
            topic_stats["correctAnswers"] += 1
            topic_stats["totalPoints"] += awarded_points
        
        # Update difficulty-specific stats
        topic_stats["byDifficulty"][difficulty]["attempted"] += 1
        if is_correct:
            topic_stats["byDifficulty"][difficulty]["correct"] += 1

        topic_stats["accuracy"] = round(
            (topic_stats["correctAnswers"] / topic_stats["totalQuestions"]) * 100
        )
        topic_stats["lastUpdated"] = datetime.utcnow().isoformat()

        logger.debug(f"Topic stats after update: {topic_stats}")

        # Update overall stats
        overall_stats["totalQuestions"] += 1
        if is_correct:
            overall_stats["correctAnswers"] += 1
            overall_stats["totalPoints"] += awarded_points
            overall_stats["currentStreak"] += 1
            overall_stats["longestStreak"] = max(
                overall_stats["longestStreak"],
                overall_stats["currentStreak"]
            )
        else:
            overall_stats["currentStreak"] = 0

        overall_stats["lastAttemptDate"] = datetime.utcnow().isoformat()

        logger.debug(f"Overall stats after update: {overall_stats}")

        # Add attempt to history
        attempt_history = user_data["attempt_history"]
        attempt_history.append({
            "question_id": question_id,
            "topic": topic,
            "difficulty": difficulty,
            "selected_option": selected_option,
            "is_correct": is_correct,
            "points_awarded": awarded_points,
            "timestamp": datetime.utcnow().isoformat()
        })
        # Keep only last 100 attempts
        attempt_history = attempt_history[-100:]

        logger.debug("Saving updates to Firestore")
        try:
            # Save all updates back to user
            user_ref.update({
                "performance": performance,
                "overall_stats": overall_stats,
                "attempt_history": attempt_history
            })
            logger.debug("Updates saved successfully")
        except Exception as e:
            logger.error(f"Error saving to Firestore: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            return jsonify({"error": "Failed to save performance data"}), 500
        
        return jsonify({
            "correct": is_correct,
            "awardedPoints": awarded_points,
            "updatedPerformance": topic_stats,
            "overallStats": overall_stats
        }), 200
    except Exception as e:
        logger.error(f"Error in submit_answer: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500
