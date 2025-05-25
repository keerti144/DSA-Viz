import sys
import os
from firebase_admin import firestore

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from config import db

def update_topic_names():
    try:
        # Get all questions
        questions = db.collection("questions").get()
        
        updated = 0
        for doc in questions:
            data = doc.to_dict()
            topic = data.get('topic', '')
            
            # Skip if topic is already lowercase
            if topic == topic.lower():
                continue
                
            # Update the topic to lowercase
            doc.reference.update({
                'topic': topic.lower()
            })
            updated += 1
            print(f"Updated topic '{topic}' to '{topic.lower()}' for question: {data.get('question', '')[:100]}...")
            
        print(f"\n✅ Successfully updated {updated} questions in Firebase")
    except Exception as e:
        print(f"❌ Error updating topic names: {e}")

if __name__ == "__main__":
    update_topic_names() 