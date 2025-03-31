import os
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()

# Check if the variables are loaded correctly
print("SECRET_KEY:", os.getenv("SECRET_KEY"))  # Should print your secret key
print("FIREBASE_CREDENTIALS_PATH:", os.getenv("FIREBASE_CREDENTIALS_PATH"))  # Should print the correct path
