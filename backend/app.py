from flask import Flask, request, jsonify
from flask_cors import CORS
from groq_api import get_custom_questions
import traceback

app = Flask(__name__)
CORS(app)

@app.route('/generate-questions', methods=['POST'])
def generate_questions():
    try:
        user_input = request.get_json()
        if not user_input:
            return jsonify({"error": "No data received"}), 400

        # Ensure topics is a list
        if "topics" not in user_input:
            user_input["topics"] = ["General DSA"]
        elif not isinstance(user_input["topics"], list):
            user_input["topics"] = [user_input["topics"]]

        # Ensure other required fields have default values
        user_input.setdefault("difficulty_level", "Medium")
        user_input.setdefault("challenge_mode", False)
        user_input.setdefault("energy_level", "Medium")
        user_input.setdefault("stress_level", "Medium")
        user_input.setdefault("time_spent", 60)

        try:
            qs = get_custom_questions(user_input)
            if not qs:
                return jsonify({"error": "No questions were generated"}), 500
            return jsonify({"questions": qs})
        except Exception as api_error:
            print("Error in get_custom_questions:", str(api_error))
            print("Full traceback:", traceback.format_exc())
            return jsonify({"error": str(api_error)}), 500

    except Exception as e:
        print("Unexpected error:", str(e))
        print("Full traceback:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)