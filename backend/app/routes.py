from flask import Blueprint

routes_bp = Blueprint("routes", __name__)  # Blueprint for API routes

@routes_bp.route("/")
def home():
    return "Hello, World!"
