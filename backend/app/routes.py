from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from app.db import db
from datetime import datetime
import logging
import traceback
import ast
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS
import os
from config import Config
from groq_api import generate_notes, get_custom_questions, generate_roadmap
import uuid

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

routes_bp = Blueprint("routes", __name__)  # Blueprint for API routes
CORS(routes_bp)  # Enable CORS for all routes in this blueprint

# Initialize Firestore
db = firestore.client()

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

@routes_bp.route("/help-queries", methods=['GET'])
def get_help_queries():
    try:
        # Get the latest help queries from Firestore
        queries_ref = db.collection('help_queries')
        queries = queries_ref.order_by('timestamp', direction=firestore.Query.DESCENDING).limit(5).stream()
        
        # Convert to list of dictionaries
        help_queries = []
        for query in queries:
            query_data = query.to_dict()
            help_queries.append({
                'id': query.id,
                'question': query_data.get('query', ''),  # Changed from 'query' to 'question' to match frontend
                'answer': query_data.get('answer', ''),
                'timestamp': query_data.get('timestamp').isoformat() if query_data.get('timestamp') else None,
                'status': query_data.get('status', 'pending'),
                'email': query_data.get('email', 'No email provided')
            })
            
        return jsonify(help_queries)
    except Exception as e:
        logger.error(f"Error in get_help_queries: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': 'Failed to fetch help queries'}), 500

@routes_bp.route("/send-help-query", methods=['POST'])
def send_help_query():
    try:
        data = request.get_json()
        query = data.get('query')
        email = data.get('email', 'No email provided')
        
        if not query:
            return jsonify({'error': 'Query is required'}), 400
            
        # Store in Firestore
        query_data = {
            'query': query,
            'email': email,
            'timestamp': datetime.now(),
            'status': 'pending',
            'answer': ''
        }
        query_ref = db.collection('help_queries').add(query_data)
        
        # Only attempt to send emails if email configuration is available
        if all([Config.MAIL_USERNAME, Config.MAIL_PASSWORD]):
            try:
                # Send email notification to admin
                msg = MIMEMultipart()
                msg['From'] = Config.MAIL_DEFAULT_SENDER
                msg['To'] = Config.ADMIN_EMAIL
                msg['Subject'] = 'New Help Query'
                
                body = f"""
                New help query received:
                
                Query: {query}
                From: {email}
                Time: {datetime.now()}
                Query ID: {query_ref[1].id}
                
                You can reply to this query using the admin dashboard.
                """
                
                msg.attach(MIMEText(body, 'plain'))
                
                # Send email to admin
                server = smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT)
                server.starttls()
                server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
                server.send_message(msg)
                server.quit()
                
                # Send confirmation email to user if email is provided
                if email and email != 'No email provided':
                    user_msg = MIMEMultipart()
                    user_msg['From'] = Config.MAIL_DEFAULT_SENDER
                    user_msg['To'] = email
                    user_msg['Subject'] = 'Help Query Received - AlgoRize'
                    
                    user_body = f"""
                    Thank you for contacting AlgoRize support!
                    
                    We have received your query:
                    {query}
                    
                    Our team will review your query and get back to you as soon as possible.
                    You can check the status of your query in the help section of the application.
                    
                    Best regards,
                    AlgoRize Support Team
                    """
                    
                    user_msg.attach(MIMEText(user_body, 'plain'))
                    
                    server = smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT)
                    server.starttls()
                    server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
                    server.send_message(user_msg)
                    server.quit()
            except Exception as email_error:
                logger.error(f"Error sending email: {str(email_error)}")
                logger.error(f"Email error traceback: {traceback.format_exc()}")
                # Continue with the response even if email fails
                pass
        
        return jsonify({'message': 'Query submitted successfully'})
    except Exception as e:
        logger.error(f"Error in send_help_query: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': 'Failed to send help query'}), 500

@routes_bp.route("/help-queries/<query_id>", methods=['DELETE'])
def delete_help_query(query_id):
    try:
        # Delete the query from Firestore
        db.collection('help_queries').document(query_id).delete()
        return jsonify({'message': 'Query deleted successfully'})
    except Exception as e:
        logger.error(f"Error in delete_help_query: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': 'Failed to delete help query'}), 500

@routes_bp.route("/help-queries/<query_id>/reply", methods=['POST'])
def reply_to_query(query_id):
    try:
        data = request.get_json()
        answer = data.get('answer')
        
        if not answer:
            return jsonify({'error': 'Answer is required'}), 400
            
        # Get the query from Firestore
        query_ref = db.collection('help_queries').document(query_id)
        query_doc = query_ref.get()
        
        if not query_doc.exists:
            return jsonify({'error': 'Query not found'}), 404
            
        query_data = query_doc.to_dict()
        user_email = query_data.get('email')
        
        # Update the query with the answer
        query_ref.update({
            'answer': answer,
            'status': 'answered',
            'answered_at': datetime.now()
        })
        
        # Only attempt to send email if email configuration is available
        if all([Config.MAIL_USERNAME, Config.MAIL_PASSWORD]) and user_email and user_email != 'No email provided':
            try:
                msg = MIMEMultipart()
                msg['From'] = Config.MAIL_DEFAULT_SENDER
                msg['To'] = user_email
                msg['Subject'] = 'Response to Your Help Query - AlgoRize'
                
                body = f"""
                Hello,
                
                We have responded to your help query:
                
                Your Query:
                {query_data.get('query')}
                
                Our Response:
                {answer}
                
                Thank you for using AlgoRize!
                
                Best regards,
                AlgoRize Support Team
                """
                
                msg.attach(MIMEText(body, 'plain'))
                
                server = smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT)
                server.starttls()
                server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
                server.send_message(msg)
                server.quit()
            except Exception as email_error:
                logger.error(f"Error sending reply email: {str(email_error)}")
                logger.error(f"Email error traceback: {traceback.format_exc()}")
                # Continue with the response even if email fails
                pass
        
        return jsonify({'message': 'Reply sent successfully'})
    except Exception as e:
        logger.error(f"Error in reply_to_query: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': 'Failed to send reply'}), 500

@routes_bp.route("/generate-notes", methods=['POST'])
def generate_notes_endpoint():
    try:
        data = request.get_json()
        topic = data.get('topic')
        prompt_details = data.get('prompt_details')
        target_audience = data.get('target_audience', 'beginner')
        note_format = data.get('note_format', 'bullet')
        depth = data.get('depth', 'summary')
        reference_type = data.get('reference_type', 'textbook')
        language_tone = data.get('language_tone', 'formal')

        if not topic or not prompt_details:
            return jsonify({'error': 'Topic and prompt details are required'}), 400

        notes = generate_notes(
            topic=topic,
            prompt_details=prompt_details,
            target_audience=target_audience,
            note_format=note_format,
            depth=depth,
            reference_type=reference_type,
            language_tone=language_tone
        )

        return jsonify({'notes': notes}), 200
    except Exception as e:
        logger.error(f"Error in generate_notes_endpoint: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@routes_bp.route("/generate-questions", methods=['POST'])
def generate_questions_endpoint():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        questions = get_custom_questions(data)
        return jsonify({'questions': questions}), 200
    except Exception as e:
        logger.error(f"Error in generate_questions_endpoint: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@routes_bp.route("/generate-roadmap", methods=['POST'])
def generate_roadmap_endpoint():
    try:
        data = request.get_json()
        topic = data.get('topic')
        main_outcome = data.get('main_outcome')
        target_date = data.get('target_date')
        time_commitment = data.get('time_commitment')
        roadmap_format = data.get('roadmap_format', 'flexible')
        depth_level = data.get('depth_level', 'beginner')
        learning_scope = data.get('learning_scope', 'broad')
        skip_basics = data.get('skip_basics', False)
        learning_style = data.get('learning_style', [])
        learning_approach = data.get('learning_approach', [])
        include_theory = data.get('include_theory', True)
        current_level = data.get('current_level', 'beginner')
        existing_skills = data.get('existing_skills', '')

        if not topic or not main_outcome or not target_date or not time_commitment:
            return jsonify({'error': 'Topic, main outcome, target date, and time commitment are required'}), 400

        roadmap = generate_roadmap(
            topic=topic,
            main_outcome=main_outcome,
            target_date=target_date,
            time_commitment=time_commitment,
            roadmap_format=roadmap_format,
            depth_level=depth_level,
            learning_scope=learning_scope,
            skip_basics=skip_basics,
            learning_style=learning_style,
            learning_approach=learning_approach,
            include_theory=include_theory,
            current_level=current_level,
            existing_skills=existing_skills
        )

        return jsonify({'roadmap': roadmap}), 200
    except Exception as e:
        logger.error(f"Error in generate_roadmap_endpoint: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@routes_bp.route("/save-roadmap", methods=['POST'])
def save_roadmap():
    try:
        data = request.get_json()
        uid = data.get('uid')
        roadmap_data = data.get('roadmap_data')
        
        if not uid or not roadmap_data:
            return jsonify({'error': 'User ID and roadmap data are required'}), 400
            
        # Add timestamp and ID to roadmap data
        roadmap_data['timestamp'] = datetime.now()
        roadmap_data['id'] = str(uuid.uuid4())
        
        # Save to Firestore
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            user_ref.set({'saved_roadmaps': []})
            
        user_ref.update({
            'saved_roadmaps': firestore.ArrayUnion([roadmap_data])
        })
        
        return jsonify({'message': 'Roadmap saved successfully', 'roadmap_id': roadmap_data['id']}), 200
    except Exception as e:
        logger.error(f"Error in save_roadmap: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@routes_bp.route("/get-saved-roadmaps/<uid>", methods=['GET'])
def get_saved_roadmaps(uid):
    try:
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return jsonify({'saved_roadmaps': []}), 200
            
        user_data = user_doc.to_dict()
        saved_roadmaps = user_data.get('saved_roadmaps', [])
        
        # Sort roadmaps by timestamp in descending order
        saved_roadmaps.sort(key=lambda x: x.get('timestamp', datetime.min), reverse=True)
        
        return jsonify({'saved_roadmaps': saved_roadmaps}), 200
    except Exception as e:
        logger.error(f"Error in get_saved_roadmaps: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

@routes_bp.route("/delete-roadmap/<uid>/<roadmap_id>", methods=['DELETE'])
def delete_roadmap(uid, roadmap_id):
    try:
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return jsonify({'error': 'User not found'}), 404
            
        user_data = user_doc.to_dict()
        saved_roadmaps = user_data.get('saved_roadmaps', [])
        
        # Find and remove the roadmap
        updated_roadmaps = [r for r in saved_roadmaps if r.get('id') != roadmap_id]
        
        if len(updated_roadmaps) == len(saved_roadmaps):
            return jsonify({'error': 'Roadmap not found'}), 404
            
        user_ref.update({'saved_roadmaps': updated_roadmaps})
        
        return jsonify({'message': 'Roadmap deleted successfully'}), 200
    except Exception as e:
        logger.error(f"Error in delete_roadmap: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500
