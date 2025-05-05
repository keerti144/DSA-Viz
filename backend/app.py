from flask import Flask, request, jsonify
from flask_cors import CORS
from groq_api import get_custom_questions

app = Flask(__name__)
CORS(app)

@app.route('/generate-questions', methods=['POST'])
def generate_questions():
    user_input = request.get_json()
    qs = get_custom_questions(user_input)  # this is now a list
    return jsonify({ "questions": qs })

if __name__ == '__main__':
    app.run(debug=True)
