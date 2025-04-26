import requests

# Your Groq API key
GROQ_API_KEY = "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"

def get_custom_questions(user_input):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    topics = ", ".join(user_input.get("topics", []))
    num_questions = calculate_num_questions(user_input.get("time_spent", 60))

    data = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
            {"role": "system", "content": "You are an expert DSA mentor. Generate MCQs with 4 options (A, B, C, D) based on the user's preferences."},
            {"role": "user", "content": f"""
                Generate {num_questions} MCQ questions for the user:
                Difficulty: {user_input.get('difficulty_level')}
                Topics: {topics}
                Challenge Mode: {user_input.get('challenge_mode')}
                Energy Level: {user_input.get('energy_level')}
                Stress Level: {user_input.get('stress_level')}
                
                
                Ensure each question has 4 options (A, B, C, D) and specify the correct answer.
            """}
        ],
        "temperature": 0.7
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        response_data = response.json()
        questions_text = response_data["choices"][0]["message"]["content"]
        questions = format_mcq_questions(questions_text)
        return questions
    else:
        return {"error": response.text}

def calculate_num_questions(time_spent):
    if time_spent < 30:
        return 5
    elif 30 <= time_spent <= 60:
        return 10
    else:
        return 15

def format_mcq_questions(questions_text):
    questions = []
    raw_questions = questions_text.strip().split("\n\n")  # Assuming two newlines between questions

    for block in raw_questions:
        lines = block.strip().split("\n")
        if len(lines) >= 5:
            q_text = lines[0].strip()
            options = {
                "A": lines[1][2:].strip(),
                "B": lines[2][2:].strip(),
                "C": lines[3][2:].strip(),
                "D": lines[4][2:].strip(),
            }
            formatted_question = {
                "question": q_text,
                "options": options,
                "answer": "A",  # Default to A for now
                "score": 10
            }
            questions.append(formatted_question)

    return questions
