from flask import Flask, request, jsonify
from flask_cors import CORS
from groq_api import get_custom_questions

app = Flask(__name__)
CORS(app)

@app.route('/generate-questions', methods=['POST'])
def generate_questions():
    try:
        user_input = request.get_json()
        questions = get_custom_questions(user_input)
        if isinstance(questions, dict) and "error" in questions:
            return jsonify({"error": questions["error"]}), 400
        return jsonify({'questions': questions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
