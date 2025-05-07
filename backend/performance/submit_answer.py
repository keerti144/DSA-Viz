from tests.track_performance import update_user_performance

def submit_answer(uid, topic, selected_option, correct_option, points_awarded=10):
    is_correct = (selected_option == correct_option)
    
    print(f"\n🧠 User {uid} answered a question on {topic}")
    print(f"Selected: {selected_option} | Correct: {correct_option}")
    print("✅ Correct!" if is_correct else "❌ Incorrect!")

    update_user_performance(uid, topic, is_correct, points_awarded)

# Example usage
if __name__ == "__main__":
    user_id = "testuser123"
    topic = "Graphs"
    selected = "Dijkstra"
    correct = "Dijkstra"  # Change this to simulate wrong answers

    submit_answer(user_id, topic, selected, correct)
