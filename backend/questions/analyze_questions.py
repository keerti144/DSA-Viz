import json
import os
from collections import defaultdict

def analyze_questions():
    # Load questions from JSON file
    json_path = os.path.join(os.path.dirname(__file__), "questions.json")
    with open(json_path, "r", encoding="utf-8") as f:
        questions = json.load(f)

    # Initialize counters
    topic_difficulty = defaultdict(lambda: defaultdict(int))
    topic_type = defaultdict(lambda: defaultdict(int))
    total_by_difficulty = defaultdict(int)
    total_by_type = defaultdict(int)

    # Count questions
    for q in questions:
        topic = q.get('topic', 'unknown')
        difficulty = q.get('difficulty', 'unknown')
        q_type = q.get('type', 'unknown')
        
        topic_difficulty[topic][difficulty] += 1
        topic_type[topic][q_type] += 1
        total_by_difficulty[difficulty] += 1
        total_by_type[q_type] += 1

    # Print results
    print("\n📊 Question Distribution by Topic and Type:")
    print("-" * 80)
    print(f"{'Topic':<30} {'MCQ':<10} {'Debug':<10} {'Interview':<10} {'Total':<10}")
    print("-" * 80)
    
    for topic in sorted(topic_type.keys()):
        mcq = topic_type[topic]['mcq']
        debug = topic_type[topic]['debugging']
        interview = topic_type[topic]['interview']
        total = mcq + debug + interview
        print(f"{topic:<30} {mcq:<10} {debug:<10} {interview:<10} {total:<10}")

    print("\n📊 Question Distribution by Type:")
    print("-" * 50)
    for q_type, count in sorted(total_by_type.items()):
        print(f"{q_type}: {count} questions")

    print("\n📊 Total Questions by Difficulty:")
    print("-" * 50)
    for difficulty, count in sorted(total_by_difficulty.items()):
        print(f"{difficulty}: {count} questions")

if __name__ == "__main__":
    analyze_questions() 