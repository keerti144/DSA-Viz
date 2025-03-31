from flask import Blueprint, request, jsonify
from firebase_admin import auth

auth_bp = Blueprint("auth", __name__)  # Authentication blueprint

@auth_bp.route('/auth/google-login', methods=['POST'])
def google_login():
    try:
        data = request.json
        id_token = data.get('idToken')

        if not id_token:
            return jsonify({"error": "No ID token provided"}), 400

        # Verify the token with Firebase
        decoded_token = auth.verify_id_token(id_token)
        user_id = decoded_token['uid']

        return jsonify({"message": "Login successful", "user": {"uid": user_id}})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
