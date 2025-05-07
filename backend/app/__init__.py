from flask import Flask
from flask_cors import CORS
from config import Config
from firebase_admin import credentials, initialize_app, _apps, firestore
from app.routes import routes_bp
from app.auth import auth_bp
from performance.routes import test_routes
from .database import db


# Firebase Initialization (Only if not initialized)
if not _apps:
    cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
    initialize_app(cred)

# Initialize Firestore
db = firestore.client()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)  # Enable CORS for frontend

    # Initialize database
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(routes_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(test_routes)

    # Register performance blueprint
    from .routes.performance import performance_bp
    app.register_blueprint(performance_bp, url_prefix='/api')

    return app
