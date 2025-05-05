import firebase_admin
from config import Config
from flask import Blueprint, request, jsonify
from firebase_admin import auth
import logging


from config import Config,db  # ✅ Reuse initialized db from config


auth_bp = Blueprint("auth", __name__)  # Authentication blueprint

# Function to create a user in Firestore
def create_user_in_firestore(uid, email, full_name='', username=''):
    user_ref = db.collection('users').document(uid)
    
    # Check if the user document already exists
    if not user_ref.get().exists:
        # Create a new user document if it doesn't exist
        user_ref.set({
            'email': email,
            'fullName': full_name,
            'username': username,
        })
        print(f"User document created for {uid}")
    else:
        print(f"User document for {uid} already exists.")


# Endpoint to handle Google login
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
        user_info = auth.get_user(user_id)

        full_name = user_info.display_name or 'User'
        username = full_name.replace(" ", "_").lower()  # Simple username generation

         # Check if the user document exists in Firestore
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()

        if not user_doc.exists:
            # Create the user document if it does not exist
            user_ref.set({
                'email': user_info.email,
                'fullName': full_name,
                'username': username,
                'uid': user_id
            })
            print(f"User document created for {user_id}")
        else:
            # If the user document exists, update if necessary
            user_ref.update({
                'fullName': full_name,
                'username': username,
            })
            print(f"User document updated for {user_id}")

        return jsonify({
            "message": "Login successful",
            "user": {
                "uid": user_id,
                "email": user_info.email,
                "fullName": full_name,
                "username": username
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to check if the username already exists in Firestore
def check_username_in_database(username):
    # Query Firestore for the username
    users_ref = db.collection('users')  # Replace 'users' with your Firestore collection name
    query = users_ref.where('username', '==', username).limit(1).stream()
    
    # Check if a user with the given username exists
    return any(doc for doc in query)

@auth_bp.route('/auth/check-username', methods=['GET'])
def check_username():
    try:
        username = request.args.get('username')

        if not username:
            return jsonify({"error": "Username is required"}), 400

        exists = check_username_in_database(username)

        return jsonify({"exists": exists}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Endpoint to handle user registration
@auth_bp.route('/auth/signup', methods=['POST'])
def sign_up():
    try:
        data = request.json
        print("Received signup data:", data)
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')
        full_name = data.get('fullName')

        # Check if all fields are provided
        if not email or not password or not username:
            return jsonify({"error": "Email, password, and username are required"}), 400
        
        # Check if the username already exists
        if check_username_in_database(username):
            return jsonify({"error": "Username already exists. Please choose a different one."}), 400

        # Create the user with email and password
        user = auth.create_user(
            email=email,
            password=password
        )
        print(f"User created: {user.uid}")  # Debugging line

        # Save additional user data to Firestore
        db.collection('users').document(user.uid).set({
            'email': email,
            'username': username,
            'fullName': full_name,
            'uid': user.uid  # Store the UID in Firestore
        })
        print(f"User document created for UID: {user.uid} in Firestore")  # Debugging line

        return jsonify({"message": "User created successfully!", "user": {"uid": user.uid, "email": email, "username": username}})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# Set up logging (you might want to configure it further depending on your app)
logging.basicConfig(level=logging.DEBUG)


@auth_bp.route('/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        logging.debug("Received login data: %s", data)
        email = data.get('email')
        password = data.get('password')


        if not email or not password:
            return jsonify({"error": "Email and password are required."}), 400

        # Firebase does NOT allow direct login with email+password via Admin SDK 😢
        # So normally we need Client SDK (frontend), but we can REST API it manually

        import requests
        FIREBASE_API_KEY = Config.FIREBASE_API_KEY  # Ensure you have this in your config
        firebase_login_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"

        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }

        firebase_response = requests.post(firebase_login_url, json=payload)

        if firebase_response.status_code == 200:
            user_data = firebase_response.json()
            uid = user_data["localId"]
            id_token = user_data["idToken"]
            
            # Check if the user document exists in Firestore
            user_ref = db.collection('users').document(uid)
            user_doc = user_ref.get()

            if not user_doc.exists:
                return jsonify({"error": "User not found, please sign up first."}), 404

             # Check if the user document has all necessary fields
            user_info = user_doc.to_dict()
            missing_fields = []
            if not user_info.get('username'):
                missing_fields.append('username')
            if not user_info.get('fullName'):
                missing_fields.append('fullName')

            if missing_fields:
                return jsonify({
                    "message": "User profile incomplete, please update your profile.",
                    "redirectTo": "/settings",  # You can prompt the user to fill in their missing details
                    "missingFields": missing_fields  # Send the list of missing fields for better clarity
                })

            return jsonify({
                "message": "Login successful!",
                "user": {
                    "email": user_data["email"],
                    "uid": uid,
                    "idToken": id_token
                }
            })
        else:
            error_message = firebase_response.json().get("error", {}).get("message", "Login failed")
            logging.error("Firebase login failed: %s", error_message)  # Log the error for debugging
            logging.error("Full Firebase response: %s", firebase_response.json())  # Add this for debugging
            return jsonify({"error": error_message}), 400

    except requests.exceptions.RequestException as e:
        logging.error("Error during Firebase login request: %s", str(e))  # Log request-specific errors
        return jsonify({"error": "Error connecting to Firebase."}), 500
    except Exception as e:
        logging.error("An unexpected error occurred: %s", str(e))
        return jsonify({"error": str(e)}), 500
    

@auth_bp.route('/auth/get-user', methods=['GET'])
def get_user():
    try:
        uid = request.args.get('uid')
        if not uid:
            return jsonify({"error": "UID is required"}), 400

        user_doc = db.collection('users').document(uid).get()
        if user_doc.exists:
            return jsonify({"user": user_doc.to_dict()}), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
