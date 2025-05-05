from flask import Flask
from flask_cors import CORS
from config import Config
from firebase_admin import credentials, initialize_app, _apps, firestore
from app.routes import routes_bp
from app.auth import auth_bp

# Firebase Initialization (Only if not initialized)
if not _apps:
    cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
    initialize_app(cred)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)  # Enable CORS for frontend

    # Register Blueprints
    app.register_blueprint(routes_bp)
    app.register_blueprint(auth_bp)

    # Initialize Firestore
    db = firestore.client()
    return app
