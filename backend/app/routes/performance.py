from flask import Blueprint, jsonify, request
from datetime import datetime
from ..models.user_performance import (
    UserPerformance, LeaderboardEntry, TimeBoundChallenge,
    ForumPost, ForumComment
)
from ..database import db

performance_bp = Blueprint('performance', __name__)

@performance_bp.route('/user/<user_id>/performance', methods=['GET'])
def get_user_performance(user_id):
    performance = db.get_user_performance(user_id)
    if not performance:
        return jsonify({'error': 'User performance not found'}), 404
    return jsonify(performance.__dict__)

@performance_bp.route('/user/<user_id>/xp', methods=['POST'])
def add_xp(user_id):
    data = request.get_json()
    points = data.get('points', 0)
    
    performance = db.get_user_performance(user_id)
    if not performance:
        performance = UserPerformance(user_id=user_id)
    
    performance.add_xp(points)
    db.save_user_performance(performance)
    
    return jsonify({'message': 'XP added successfully', 'new_xp': performance.xp_points})

@performance_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    entries = db.get_leaderboard_entries()
    return jsonify([entry.__dict__ for entry in entries])

@performance_bp.route('/challenges', methods=['GET'])
def get_challenges():
    challenges = db.get_active_challenges()
    return jsonify([challenge.__dict__ for challenge in challenges])

@performance_bp.route('/challenges', methods=['POST'])
def create_challenge():
    data = request.get_json()
    challenge = TimeBoundChallenge(
        challenge_id=data['challenge_id'],
        title=data['title'],
        description=data['description'],
        start_time=datetime.fromisoformat(data['start_time']),
        end_time=datetime.fromisoformat(data['end_time']),
        difficulty=data['difficulty'],
        xp_reward=data['xp_reward']
    )
    db.save_challenge(challenge)
    return jsonify({'message': 'Challenge created successfully'})

@performance_bp.route('/forum/posts', methods=['GET'])
def get_forum_posts():
    posts = db.get_forum_posts()
    return jsonify([post.__dict__ for post in posts])

@performance_bp.route('/forum/posts', methods=['POST'])
def create_forum_post():
    data = request.get_json()
    post = ForumPost(
        post_id=data['post_id'],
        user_id=data['user_id'],
        username=data['username'],
        title=data['title'],
        content=data['content'],
        tags=data.get('tags', [])
    )
    db.save_forum_post(post)
    return jsonify({'message': 'Post created successfully'})

@performance_bp.route('/forum/posts/<post_id>/comments', methods=['POST'])
def add_comment(post_id):
    data = request.get_json()
    comment = ForumComment(
        comment_id=data['comment_id'],
        user_id=data['user_id'],
        username=data['username'],
        content=data['content']
    )
    db.add_comment_to_post(post_id, comment)
    return jsonify({'message': 'Comment added successfully'})

@performance_bp.route('/user/<user_id>/achievements', methods=['GET'])
def get_user_achievements(user_id):
    performance = db.get_user_performance(user_id)
    if not performance:
        return jsonify({'error': 'User performance not found'}), 404
    return jsonify({'achievements': performance.achievements})

@performance_bp.route('/user/<user_id>/topic-completion', methods=['GET'])
def get_topic_completion(user_id):
    performance = db.get_user_performance(user_id)
    if not performance:
        return jsonify({'error': 'User performance not found'}), 404
    return jsonify({'topic_completion': performance.topic_completion}) 