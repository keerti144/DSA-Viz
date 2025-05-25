import requests
import re
import os
import traceback
import json
from config import Config

# Get Groq API key from Config
GROQ_API_KEY = Config.GROQ_API_KEY

def get_custom_questions(user_input):
    try:
        if not GROQ_API_KEY:
            raise Exception("Groq API key is not configured")

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        topics = ", ".join(user_input.get("topics", ["General DSA"]))
        num_questions = calculate_num_questions(
            user_input.get("time_spent", 60),
            user_input.get("energy_level", "Medium"),
            user_input.get("stress_level", "Medium")
        )

        data = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": """ 
You are an expert DSA (Data Structures and Algorithms) mentor and competitive programming coach.
Your task is to generate *high-quality MCQs* (Multiple Choice Questions) for users based on their preferences. 

Strict Instructions:
- All questions MUST be based on *Computer Science concepts, specifically **Data Structures, **Algorithms, **Time Complexity, **Space Complexity, and **Problem Solving Strategies*.
- Each question must have exactly *4 options (A, B, C, D)*.
- *One and only one correct answer* must be clearly marked.
- DO NOT use *code snippets* or require code reading unless explicitly asked.
- Questions must be *conceptual, logical, and reasoning based*, not memory based.
- If *Energy Level* is high → include *more difficult questions*.
- If *Stress Level* is low → include *critical thinking questions* that require deeper analysis.
- Maintain a *professional standard*: no ambiguous wording, no trivial or vague questions.
- Questions should test understanding, application, and critical thinking — NOT just definitions.

CRITICAL FORMATTING RULES:
1. Each question MUST start with a number followed by a period and space (e.g., "1. ")
2. Each option MUST start with a letter followed by a closing parenthesis and space (e.g., "A) ")
3. The answer line MUST start with "Answer: " followed by the correct option letter
4. DO NOT add any additional text, explanations, or formatting
5. DO NOT use markdown or special characters
6. Each question must be separated by a blank line

Example format:
1. What is the time complexity of binary search in the worst case?
A) O(1)
B) O(log n)
C) O(n)
D) O(n log n)
Answer: B

"""},
                {"role": "user", "content": f"""
Generate exactly {num_questions} MCQs for me based on the following preferences:

- *Difficulty Level*: {user_input.get('difficulty_level')}
- *Topics*: {topics}
- *Challenge Mode*: {user_input.get('challenge_mode')}
- *Energy Level*: {user_input.get('energy_level')}
- *Stress Level*: {user_input.get('stress_level')}

Follow all the system instructions strictly.
Only output the questions with their 4 options and correct answers.
Make sure to follow the exact format shown in the system prompt.
DO NOT add any additional text or explanations.
"""}
            ],
            "temperature": 0.7,
            "max_tokens": 2000
        }

        print("Sending request to Groq API with data:", json.dumps(data, indent=2))
        response = requests.post(url, headers=headers, json=data)
        
        if response.status_code != 200:
            error_message = f"Groq API error: {response.status_code}"
            try:
                error_details = response.json()
                error_message += f" - {error_details}"
            except:
                error_message += f" - {response.text}"
            raise Exception(error_message)

        response_data = response.json()
        print("Received response from Groq API:", json.dumps(response_data, indent=2))
        
        if "choices" not in response_data or not response_data["choices"]:
            raise Exception("Invalid response format from Groq API")

        text = response_data["choices"][0]["message"]["content"]
        print("\nRaw API response text:")
        print("=" * 80)
        print(text)
        print("=" * 80)
        
        # Clean up the text before parsing
        text = text.strip()
        # Remove any markdown formatting
        text = re.sub(r'\\|\*|`|_', '', text)
        # Ensure proper line endings
        text = text.replace('\r\n', '\n')
        # Remove multiple consecutive blank lines
        text = re.sub(r'\n\s*\n', '\n\n', text)
        
        formatted_questions = format_mcq_questions(text)
        
        if not formatted_questions:
            print("\nFailed to parse questions. Raw text was:")
            print("=" * 80)
            print(text)
            print("=" * 80)
            raise Exception("Failed to format questions from API response")
            
        print("\nSuccessfully parsed questions:", json.dumps(formatted_questions, indent=2))
        return formatted_questions
    except Exception as e:
        print("Error in get_custom_questions:", str(e))
        print("Full traceback:", traceback.format_exc())
        raise

def calculate_num_questions(time_spent, energy_level, stress_level):
    try:
        # Validate inputs
        if not isinstance(time_spent, (int, float)) or time_spent < 0:
            print(f"Invalid time_spent value: {time_spent}, defaulting to 30 minutes")
            time_spent = 30
            
        if not isinstance(energy_level, str):
            print(f"Invalid energy_level value: {energy_level}, defaulting to Medium")
            energy_level = "Medium"
            
        if not isinstance(stress_level, str):
            print(f"Invalid stress_level value: {stress_level}, defaulting to Medium")
            stress_level = "Medium"

        # Base questions calculation based on time
        if time_spent == 0:
            base_questions = 3  # Minimum questions for zero time
        elif time_spent < 15:
            base_questions = 5  # Minimum questions for very short time
        elif time_spent < 30:
            base_questions = 15  # Short session
        elif time_spent < 45:
            base_questions = 20  # Medium-short session
        elif time_spent < 60:
            base_questions = 25  # Medium session
        elif time_spent < 90:
            base_questions = 35  # Medium-long session
        else:
            base_questions = 40  # Long session

        # Energy level adjustments
        energy_level = energy_level.lower()
        if energy_level == "high":
            base_questions += 6  # More questions for high energy
        elif energy_level == "low":
            base_questions -= 5  # Fewer questions for low energy

        # Stress level adjustments
        stress_level = stress_level.lower()
        if stress_level == "high":
            base_questions -= 4  # Fewer questions for high stress
        elif stress_level == "low":
            base_questions += 5  # More questions for low stress

        # Ensure questions are within reasonable bounds
        min_questions = 3
        max_questions = 20
        final_questions = max(min_questions, base_questions)

        print(f"\nQuestion calculation details:")
        print(f"Time spent: {time_spent} minutes")
        print(f"Energy level: {energy_level}")
        print(f"Stress level: {stress_level}")
        print(f"Base questions: {base_questions}")
        print(f"Final questions: {final_questions}")

        return final_questions
    except Exception as e:
        print(f"Error in calculate_num_questions: {e}")
        print("Defaulting to 5 questions")
        return 5  # Safe default value

def format_mcq_questions(questions_text):
    try:
        # Split into individual questions, handling both numbered and unnumbered questions
        question_blocks = re.split(r'\n(?=\d+\.\s|\n)', questions_text.strip())
        print(f"\nFound {len(question_blocks)} question blocks")
        
        parsed_questions = []

        for i, block in enumerate(question_blocks, 1):
            if not block.strip():
                continue
                
            print(f"\nProcessing question block {i}:")
            print("-" * 40)
            print(block)
            print("-" * 40)
            
            lines = [line.strip() for line in block.split('\n') if line.strip()]
            if len(lines) < 6:
                print(f"Skipping block {i} with insufficient lines: {len(lines)} lines found")
                continue

            try:
                # Extract question
                question_text = re.sub(r'^\d+\.\s*', '', lines[0]).strip()
                print(f"Question: {question_text}")
                
                # Extract options
                options = {}
                for i in range(1, 5):
                    option_line = lines[i]
                    option_match = re.match(r'^([A-D])\)\s*(.*)', option_line)
                    if not option_match:
                        print(f"Invalid option format: {option_line}")
                        continue
                    option_letter, option_text = option_match.groups()
                    options[option_letter] = option_text.strip()
                    print(f"Option {option_letter}: {option_text.strip()}")

                # Extract answer
                answer_line = lines[5]
                answer_match = re.search(r'Answer\s*[:\-]\s*([A-Da-d])\b', answer_line)
                if not answer_match:
                    print(f"Invalid answer format: {answer_line}")
                    continue

                correct_answer = answer_match.group(1).upper()
                print(f"Correct answer: {correct_answer}")

                # Validate we have all required parts
                if not question_text or len(options) != 4 or not correct_answer:
                    print(f"Incomplete question data: {block}")
                    continue

                parsed_questions.append({
                    "question": question_text,
                    "options": options,
                    "answer": correct_answer
                })
                print("Successfully parsed question!")
            except Exception as e:
                print(f"Error parsing question block: {e}")
                continue

        if not parsed_questions:
            print("No questions were successfully parsed")
            
        return parsed_questions
    except Exception as e:
        print(f"Error in format_mcq_questions: {e}")
        print("Full traceback:", traceback.format_exc())
        return []

def generate_notes(topic, prompt_details, target_audience='beginner', note_format='bullet', 
                  depth='summary', reference_type='textbook', language_tone='formal'):
    try:
        print("\nStarting generate_notes function")
        print(f"API Key present: {bool(GROQ_API_KEY)}")
        
        if not GROQ_API_KEY:
            raise Exception("Groq API key is not configured")

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        # Construct the prompt based on user preferences
        prompt = f"""You are an expert technical educator, skilled at generating in-depth, structured academic notes. Your goal is to produce high-quality study material that aligns with the following input:

---
🧠 **Topic**: {topic}

🔍 **Specific Focus**: {prompt_details}

🎯 **Target Audience**: {target_audience}
📑 **Preferred Format**: {note_format}
📘 **Depth**: {depth}
📚 **Reference Style**: {reference_type}
🗣️ **Language/Tone**: {language_tone}
---

🔧 **Instructions**:
- Structure content to include **core concepts**, **related subtopics**, and **logical progression**.
- Ensure it is **engaging**, **factually correct**, and suitable for the selected **audience level**.
- If the topic involves **programming** or **technical implementations**, include **relevant, runnable code snippets** with **comments** and **clear explanation**.
- Provide **examples, analogies**, or **case studies** where applicable.
- If `note_format` is:
  - `bullet`, use **clear, concise points**
  - `paragraph`, write in **coherent, readable prose**
  - `flashcard`, give **Q&A style summaries** per concept

🧠 **Quality Expectations**:
- Avoid shallow or vague descriptions.
- Avoid repeating obvious statements.
- Do not assume prior knowledge beyond the target audience's level.
- Use structured headings, subheadings, or markdown elements if helpful.
- Stay aligned to academic integrity and instructional value.

🎁 **Output**:
Please return only the final notes content. Do not include meta-commentary, apologies, or disclaimers. Format clearly and keep it focused on maximum learning effectiveness.
"""


        print("\nConstructed prompt:")
        print(prompt)

        data = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are an expert educator and note-taking specialist. Your task is to generate comprehensive, well-structured notes based on the given requirements."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 4000,
            "top_p": 1,
            "stream": False
        }

        print("\nSending request to Groq API")
        response = requests.post(url, headers=headers, json=data)
        print(f"Response status code: {response.status_code}")
        
        if response.status_code != 200:
            error_message = f"Groq API error: {response.status_code}"
            try:
                error_details = response.json()
                error_message += f" - {error_details}"
            except:
                error_message += f" - {response.text}"
            print(f"Error response: {error_message}")
            raise Exception(error_message)

        response_data = response.json()
        print("\nReceived response from Groq API")
        
        if "choices" not in response_data or not response_data["choices"]:
            print("Invalid response format:", response_data)
            raise Exception("Invalid response format from Groq API")

        notes = response_data["choices"][0]["message"]["content"]
        print("\nSuccessfully extracted notes from response")
        return notes

    except Exception as e:
        print(f"\nError in generate_notes: {e}")
        print("Full traceback:", traceback.format_exc())
        raise Exception("Failed to generate notes")

def generate_roadmap(topic, main_outcome, target_date, time_commitment, roadmap_format='flexible',
                    depth_level='beginner', learning_scope='broad', skip_basics=False,
                    learning_style=None, learning_approach=None, include_theory=True,
                    current_level='beginner', existing_skills=''):
    try:
        print("\nStarting generate_roadmap function")
        print(f"API Key present: {bool(GROQ_API_KEY)}")
        
        if not GROQ_API_KEY:
            raise Exception("Groq API key is not configured")

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        # Construct the prompt based on user preferences
        prompt = f"""You are an expert technical educator and career advisor, skilled at creating structured learning roadmaps. Your goal is to produce a comprehensive learning path based on the following input:

---
🧠 **Topic**: {topic}
🎯 **Main Outcome**: {main_outcome}
⏰ **Target Date**: {target_date}
⏱️ **Time Commitment**: {time_commitment}
📅 **Roadmap Format**: {roadmap_format}
📚 **Depth Level**: {depth_level}
🎯 **Learning Scope**: {learning_scope}
📖 **Skip Basics**: {'Yes' if skip_basics else 'No'}
🎨 **Learning Style**: {', '.join(learning_style) if learning_style else 'Not specified'}
📝 **Learning Approach**: {', '.join(learning_approach) if learning_approach else 'Not specified'}
📚 **Include Theory**: {'Yes' if include_theory else 'No'}
💡 **Current Level**: {current_level}
🔧 **Existing Skills**: {existing_skills}

Please create a detailed roadmap that includes:

# 🎯 Learning Roadmap: {topic}

## 📋 Overview
- **Goal**: {main_outcome}
- **Target Date**: {target_date}
- **Time Commitment**: {time_commitment}
- **Current Level**: {current_level}

## 🚀 Learning Path

### 1️⃣ Prerequisites
[List any required prerequisites if not skipping basics]

### 2️⃣ Core Concepts
[Break down the main concepts to master]

### 3️⃣ Practical Projects
[Include hands-on projects and exercises]

### 4️⃣ Recommended Resources
[Match resources to their learning style]

### 5️⃣ Milestones & Checkpoints
[Set clear milestones with dates]

### 6️⃣ Learning Strategies
[Based on their preferred approach]

### 7️⃣ Progress Tracking
[Methods to track and measure progress]

### 8️⃣ Community & Support
[Relevant communities and resources]

Format the response with:
- Clear section headers using markdown
- Emojis for visual organization
- Bullet points for easy reading
- Time estimates for each section
- Practical exercises or mini-projects
- Learning tips specific to their style
- Progress tracking methods
- Community resources

Make it practical, achievable, and well-structured for the specified experience level and time commitment.
Consider their learning style when recommending resources and activities.
Include theory only if requested.
Adjust the depth based on their current level and desired scope.
"""

        data = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are an expert educator and career advisor. Your task is to generate comprehensive, well-structured learning roadmaps based on the given requirements. Use markdown formatting, emojis, and clear organization to make the roadmap visually appealing and easy to follow."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 4000,
            "top_p": 1,
            "stream": False
        }

        print("\nSending request to Groq API")
        response = requests.post(url, headers=headers, json=data)
        print(f"Response status code: {response.status_code}")
        
        if response.status_code != 200:
            error_message = f"Groq API error: {response.status_code}"
            try:
                error_details = response.json()
                error_message += f" - {error_details}"
            except:
                error_message += f" - {response.text}"
            print(f"Error response: {error_message}")
            raise Exception(error_message)

        response_data = response.json()
        print("\nReceived response from Groq API")
        
        if "choices" not in response_data or not response_data["choices"]:
            print("Invalid response format:", response_data)
            raise Exception("Invalid response format from Groq API")

        roadmap = response_data["choices"][0]["message"]["content"]
        print("\nSuccessfully extracted roadmap from response")
        return roadmap

    except Exception as e:
        print(f"\nError in generate_roadmap: {e}")
        print("Full traceback:", traceback.format_exc())
        raise Exception("Failed to generate roadmap")