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
        user_id = data.get('user_id')
        question_id = data.get('question_id')
        selected_answer = data.get('selected_answer')
        
        if not all([user_id, question_id, selected_answer]):
            return jsonify({'error': 'Missing required fields'}), 400
            
        # Get question data from Firestore
        question_ref = db.collection('questions').document(question_id)
        question_data = question_ref.get().to_dict()
        
        if not question_data:
            return jsonify({'error': 'Question not found'}), 404
            
        # Get the correct answer based on question type
        question_type = question_data.get('type')
        if question_type == 'coding':
            correct_answer = question_data.get('answer')
        else:  # For MCQ and interview questions
            correct_answer = question_data.get('expected_answer') or question_data.get('answer')
            
        if not correct_answer:
            return jsonify({'error': 'Question has no answer field'}), 400
            
        # Evaluate answer based on question type
        is_correct = False
        if question_type == 'coding':
            # For coding questions, check for syntax errors
            try:
                # Basic syntax check
                compile(selected_answer, '<string>', 'exec')
                is_correct = True
            except SyntaxError:
                is_correct = False
        elif question_type == 'interview':
            # For interview questions, use keyword matching
            selected_answer = selected_answer.lower()
            correct_answer = correct_answer.lower()
            keywords = [word for word in correct_answer.split() if len(word) > 3]
            matches = sum(1 for keyword in keywords if keyword in selected_answer)
            is_correct = matches >= len(keywords) * 0.7  # 70% keyword match required
        else:  # MCQ questions
            # For MCQ, use exact string comparison
            is_correct = selected_answer == correct_answer
            
        # Update user performance
        performance_ref = db.collection('performance').document(user_id)
        performance = performance_ref.get()
        
        if not performance.exists:
            # Initialize performance data if it doesn't exist
            performance_ref.set({
                'total_questions': 0,
                'correct_answers': 0,
                'incorrect_answers': 0,
                'total_points': 0,
                'topics': {}
            })
            performance = performance_ref.get()
            
        performance_data = performance.to_dict()
        
        # Update overall statistics
        performance_data['total_questions'] = performance_data.get('total_questions', 0) + 1
        if is_correct:
            performance_data['correct_answers'] = performance_data.get('correct_answers', 0) + 1
            performance_data['total_points'] = performance_data.get('total_points', 0) + question_data.get('points', 0)
        else:
            performance_data['incorrect_answers'] = performance_data.get('incorrect_answers', 0) + 1
            
        # Update topic-specific statistics
        topic = question_data.get('topic', 'general')
        if topic not in performance_data['topics']:
            performance_data['topics'][topic] = {
                'total_questions': 0,
                'correct_answers': 0,
                'incorrect_answers': 0,
                'total_points': 0
            }
            
        topic_stats = performance_data['topics'][topic]
        topic_stats['total_questions'] += 1
        if is_correct:
            topic_stats['correct_answers'] += 1
            topic_stats['total_points'] += question_data.get('points', 0)
        else:
            topic_stats['incorrect_answers'] += 1
            
        # Save updated performance data
        performance_ref.set(performance_data)
        
        return jsonify({
            'is_correct': is_correct,
            'correct_answer': correct_answer,
            'explanation': question_data.get('explanation', '')
        })
        
    except Exception as e:
        print(f"Error in submit_answer: {str(e)}")
        return jsonify({'error': str(e)}), 500
