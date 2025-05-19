from app import create_app
from firebase_admin import credentials, initialize_app, _apps
from config import Config

# Initialize Firebase Admin if not already initialized
if not _apps:
    cred = credentials.Certificate(Config.FIREBASE_CREDENTIALS_PATH)
    initialize_app(cred)

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)