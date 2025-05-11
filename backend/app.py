from flask import Flask, request, jsonify
from flask_cors import CORS
from groq_api import get_custom_questions, calculate_num_questions, generate_notes
import traceback
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/generate-questions', methods=['POST'])
def handle_generate_questions():
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

@app.route('/generate-notes', methods=['POST'])
def handle_generate_notes():
    try:
        print("Received request to generate notes")
        data = request.json
        print("Request data:", data)
        
        # Extract parameters
        topic = data.get('topic')
        prompt_details = data.get('prompt_details')
        target_audience = data.get('target_audience')
        note_format = data.get('note_format')
        depth = data.get('depth')
        reference_type = data.get('reference_type')
        language_tone = data.get('language_tone')

        print("Extracted parameters:")
        print(f"Topic: {topic}")
        print(f"Prompt Details: {prompt_details}")
        print(f"Target Audience: {target_audience}")
        print(f"Note Format: {note_format}")
        print(f"Depth: {depth}")
        print(f"Reference Type: {reference_type}")
        print(f"Language Tone: {language_tone}")

        # Validate required fields
        if not all([topic, prompt_details]):
            print("Missing required fields")
            return jsonify({'error': 'Topic and prompt details are required'}), 400

        # Generate notes using the AI
        print("Calling generate_notes function")
        notes = generate_notes(
            topic=topic,
            prompt_details=prompt_details,
            target_audience=target_audience,
            note_format=note_format,
            depth=depth,
            reference_type=reference_type,
            language_tone=language_tone
        )
        print("Successfully generated notes")

        return jsonify({'notes': notes})

    except Exception as e:
        print(f"Error generating notes: {str(e)}")
        print("Full traceback:", traceback.format_exc())
        return jsonify({'error': 'Failed to generate notes'}), 500

if __name__ == '__main__':
    app.run(debug=True)