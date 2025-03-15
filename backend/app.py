from flask import Flask
from flask_cors import CORS
from config import Config
from routes import init_routes

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)  # Allow frontend requests
init_routes(app)  # Register routes

if __name__ == "__main__":
    app.run(debug=Config.DEBUG)
