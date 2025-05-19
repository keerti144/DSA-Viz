from flask import Flask
from flask_cors import CORS
from config import Config
from firebase_admin import credentials, initialize_app
import firebase_admin

def create_app():
    # Initialize Flask app
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)  # Enable CORS for all routes

    # Initialize Firebase Admin if not already initialized
    if not firebase_admin._apps:
        cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
        initialize_app(cred)

    # Register Blueprints
    from app.routes import routes_bp
    from app.auth import auth_bp
    from performance.routes import test_routes

    app.register_blueprint(routes_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(test_routes)

    return app
