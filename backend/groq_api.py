import requests

import re


# Your Groq API key
GROQ_API_KEY = "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"

def get_custom_questions(user_input):
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    topics = ", ".join(user_input.get("topics", []))
    num_questions = calculate_num_questions(
    user_input.get("time_spent", 60),
    user_input.get("energy_level", "Medium"),
    user_input.get("stress_level", "Medium")
)


    data = {
    "model": "meta-llama/llama-4-scout-17b-16e-instruct",
    "messages": [
        {"role": "system", "content": """ 
You are an expert DSA (Data Structures and Algorithms) mentor and competitive programming coach.
Your task is to generate **high-quality MCQs** (Multiple Choice Questions) for users based on their preferences. 

Strict Instructions:
- All questions MUST be based on **Computer Science concepts**, specifically **Data Structures**, **Algorithms**, **Time Complexity**, **Space Complexity**, and **Problem Solving Strategies**.
- Each question must have exactly **4 options (A, B, C, D)**.
- **One and only one correct answer** must be clearly marked.
- DO NOT use **code snippets** or require code reading unless explicitly asked.
- Questions must be **conceptual, logical, and reasoning based**, not memory based.
- If **Energy Level** is high → include **more difficult questions**.
- If **Stress Level** is low → include **critical thinking questions** that require deeper analysis.
- Maintain a **professional standard**: no ambiguous wording, no trivial or vague questions.
- Questions should test understanding, application, and critical thinking — NOT just definitions.

Examples of good question types:
- Which data structure is most efficient for [scenario]?
- What is the time complexity of [algorithm] in the worst case?
- Which sorting algorithm maintains stability in sorting?
- In which situation would [technique] outperform [technique]?

If Challenge Mode is ON:
- Make questions slightly trickier, involve edge cases, best/worst case analyses.

Tone:
- Crisp, formal, and clear.
- Assume user is preparing for tech interviews or competitive exams.

Format:
1. Question
2. A)
3. B)
4. C)
5. D)
6. Answer


No explanations needed unless specifically asked.

"""},

        {"role": "user", "content": f"""
Generate exactly {num_questions} MCQs for me based on the following preferences:

- **Difficulty Level**: {user_input.get('difficulty_level')}
- **Topics**: {topics}
- **Challenge Mode**: {user_input.get('challenge_mode')}
- **Energy Level**: {user_input.get('energy_level')}
- **Stress Level**: {user_input.get('stress_level')}

Follow all the system instructions strictly.
Only output the questions with their 4 options and correct answers.
"""}
    ],
    "temperature": 0.5
}


    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        text = response.json()["choices"][0]["message"]["content"]
        return format_mcq_questions(text)    # note: returns a list
    else:
        raise Exception(response.text)

def calculate_num_questions(time_spent, energy_level, stress_level):
    base_questions = 5

    # Adjust based on time
    if time_spent >= 90:
        base_questions += 10
    elif time_spent >= 60:
        base_questions += 5
    elif time_spent >= 30:
        base_questions += 2

    # Adjust based on energy
    if energy_level.lower() == "high":
        base_questions += 5
    elif energy_level.lower() == "low":
        base_questions -= 2

    # Adjust based on stress
    if stress_level.lower() == "high":
        base_questions -= 3
    elif stress_level.lower() == "low":
        base_questions += 2

    # Ensure at least 3 questions, and cap it at 20
    return max(3, min(base_questions, 20))


def format_mcq_questions(questions_text):
    """
    Parse the LLM text response and convert it into structured JSON:
    [
      {
        "question": "....",
        "options": {
          "A": "...",
          "B": "...",
          "C": "...",
          "D": "..."
        },
        "answer": "A"
      },
      ...
    ]
    """
    # Split the text into blocks by question
    question_blocks = re.split(r'\n(?=\d+\.\s)', questions_text.strip())
    parsed_questions = []

    for block in question_blocks:
        lines = block.strip().split('\n')
        if len(lines) < 6:
            continue  # skip incomplete questions

        question_line = lines[0]
        option_a = lines[1]
        option_b = lines[2]
        option_c = lines[3]
        option_d = lines[4]
        answer_line = lines[5]

        # Extract actual text
        question_text = re.sub(r'^\d+\.\s*', '', question_line).strip()
        option_a_text = re.sub(r'^A\)\s*', '', option_a).strip()
        option_b_text = re.sub(r'^B\)\s*', '', option_b).strip()
        option_c_text = re.sub(r'^C\)\s*', '', option_c).strip()
        option_d_text = re.sub(r'^D\)\s*', '', option_d).strip()
        answer_match = re.search(r'Answer\s*[:\-]\s*([A-D])', answer_line.strip())

        if not answer_match:
            continue  # skip if answer not found

        correct_answer = answer_match.group(1)

        parsed_questions.append({
            "question": question_text,
            "options": {
                "A": option_a_text,
                "B": option_b_text,
                "C": option_c_text,
                "D": option_d_text
            },
            "answer": correct_answer
        })

    return {"questions": parsed_questions}

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
                "correctAnswer": "A",
  # Default to A for now
                "score": 10
            }
            questions.append(formatted_question)

    return questions
