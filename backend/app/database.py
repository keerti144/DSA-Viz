from flask import current_app
from firebase_admin import credentials, firestore, initialize_app
import uuid

class Database:
    def __init__(self):
        self.db = None

    def init_app(self, app):
        cred = credentials.Certificate("firebase_key.json")
        firebase_app = initialize_app(cred)
        self.db = firestore.client()

    def get_user_performance(self, user_id):
        doc_ref = self.db.collection('user_performance').document(user_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        return None

    def save_user_performance(self, performance):
        doc_ref = self.db.collection('user_performance').document(performance.user_id)
        doc_ref.set(performance.__dict__)

    def get_leaderboard_entries(self):
        entries = []
        docs = self.db.collection('user_performance').order_by('xp_points', direction=firestore.Query.DESCENDING).limit(100).stream()
        for i, doc in enumerate(docs, 1):
            data = doc.to_dict()
            entries.append({
                'user_id': doc.id,
                'username': data.get('username', 'Anonymous'),
                'xp_points': data.get('xp_points', 0),
                'level': data.get('level', 1),
                'rank': i
            })
        return entries

    def get_active_challenges(self):
        challenges = []
        now = firestore.SERVER_TIMESTAMP
        docs = self.db.collection('challenges').where('end_time', '>', now).stream()
        for doc in docs:
            challenges.append(doc.to_dict())
        return challenges

    def save_challenge(self, challenge):
        doc_ref = self.db.collection('challenges').document(challenge.challenge_id)
        doc_ref.set(challenge.__dict__)

    def get_forum_posts(self):
        posts = []
        docs = self.db.collection('forum_posts').order_by('created_at', direction=firestore.Query.DESCENDING).stream()
        for doc in docs:
            posts.append(doc.to_dict())
        return posts

    def save_forum_post(self, post):
        if not post.post_id:
            post.post_id = str(uuid.uuid4())
        doc_ref = self.db.collection('forum_posts').document(post.post_id)
        doc_ref.set(post.__dict__)

    def add_comment_to_post(self, post_id, comment):
        if not comment.comment_id:
            comment.comment_id = str(uuid.uuid4())
        post_ref = self.db.collection('forum_posts').document(post_id)
        post_ref.update({
            'comments': firestore.ArrayUnion([comment.__dict__])
        })

db = Database() 