import unittest
import requests
from firebase_admin import firestore
import firebase_admin
from firebase_admin import credentials
import json
import os
import threading
import logging
from app import create_app

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class TestPerformanceTracking(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Start Flask server in a separate thread
        cls.app = create_app()
        cls.server_thread = threading.Thread(target=cls.app.run, kwargs={'debug': False, 'use_reloader': False})
        cls.server_thread.daemon = True
        cls.server_thread.start()
        
        # Get existing Firebase app
        cls.db = firestore.client()
        
        # Test user and question data - using real IDs from Firestore
        cls.test_uid = "2HqPtr1xCmfAun9d5AxQ5nhQ5b53"
        cls.test_question_id = "1057194584366214279"
        
        # Verify the documents exist
        user_ref = cls.db.collection("users").document(cls.test_uid)
        question_ref = cls.db.collection("questions").document(cls.test_question_id)
        
        if not user_ref.get().exists:
            raise ValueError(f"Test user {cls.test_uid} does not exist in Firestore")
        if not question_ref.get().exists:
            raise ValueError(f"Test question {cls.test_question_id} does not exist in Firestore")
            
        logger.debug(f"Using real user: {cls.test_uid}")
        logger.debug(f"Using real question: {cls.test_question_id}")

    def setUp(self):
        """Reset user performance data before each test"""
        logger.debug("Setting up test data")
        # Get the current user data
        user_ref = self.db.collection("users").document(self.test_uid)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            raise ValueError(f"Test user {self.test_uid} does not exist in Firestore")
            
        # Initialize performance tracking if it doesn't exist
        user_data = user_doc.to_dict()
        if "performance" not in user_data:
            user_ref.update({
                "performance": {
                    "Arrays": {
                        "totalQuestions": 0,
                        "correctAnswers": 0,
                        "totalPoints": 0,
                        "accuracy": 0,
                        "byDifficulty": {
                            "easy": {"attempted": 0, "correct": 0},
                            "medium": {"attempted": 0, "correct": 0},
                            "hard": {"attempted": 0, "correct": 0}
                        }
                    }
                }
            })
            
        if "overall_stats" not in user_data:
            user_ref.update({
                "overall_stats": {
                    "totalQuestions": 0,
                    "correctAnswers": 0,
                    "totalPoints": 0,
                    "currentStreak": 0,
                    "longestStreak": 0,
                    "lastAttemptDate": None
                }
            })
            
        if "attempt_history" not in user_data:
            user_ref.update({
                "attempt_history": []
            })
            
        logger.debug("Test data setup complete")

    def tearDown(self):
        """Clean up after each test"""
        logger.debug("Cleaning up test data")
        # Reset the performance data
        user_ref = self.db.collection("users").document(self.test_uid)
        user_ref.update({
            "performance.Arrays": {
                "totalQuestions": 0,
                "correctAnswers": 0,
                "totalPoints": 0,
                "accuracy": 0,
                "byDifficulty": {
                    "easy": {"attempted": 0, "correct": 0},
                    "medium": {"attempted": 0, "correct": 0},
                    "hard": {"attempted": 0, "correct": 0}
                }
            },
            "overall_stats": {
                "totalQuestions": 0,
                "correctAnswers": 0,
                "totalPoints": 0,
                "currentStreak": 0,
                "longestStreak": 0,
                "lastAttemptDate": None
            },
            "attempt_history": []
        })
        logger.debug("Test data cleanup complete")

    def test_submit_correct_answer(self):
        """Test submitting a correct answer"""
        logger.debug("Starting test_submit_correct_answer")
        url = "http://127.0.0.1:5000/submit-answer"
        
        # Get the question data first to verify the correct answer
        question_ref = self.db.collection("questions").document(self.test_question_id)
        question_doc = question_ref.get()
        question_data = question_doc.to_dict()
        logger.debug(f"Question data for test: {question_data}")
        
        # Use the expected_answer as the selected option
        payload = {
            "uid": self.test_uid,
            "question_id": self.test_question_id,
            "selected_option": question_data["expected_answer"]  # Use the actual expected answer
        }
        logger.debug(f"Test payload: {payload}")
        
        response = requests.post(url, json=payload)
        if response.status_code != 200:
            logger.error(f"Error response: {response.text}")
        self.assertEqual(response.status_code, 200)
        
        data = response.json()
        self.assertTrue(data["correct"])
        self.assertEqual(data["awardedPoints"], 10)
        
        # Verify user document was updated correctly
        user_ref = self.db.collection("users").document(self.test_uid)
        user_data = user_ref.get().to_dict()
        
        # Check topic performance
        topic_stats = user_data["performance"]["Arrays"]
        self.assertEqual(topic_stats["totalQuestions"], 1)
        self.assertEqual(topic_stats["correctAnswers"], 1)
        self.assertEqual(topic_stats["totalPoints"], 10)
        self.assertEqual(topic_stats["accuracy"], 100)
        
        # Check overall stats
        overall_stats = user_data["overall_stats"]
        self.assertEqual(overall_stats["totalQuestions"], 1)
        self.assertEqual(overall_stats["correctAnswers"], 1)
        self.assertEqual(overall_stats["totalPoints"], 10)
        self.assertEqual(overall_stats["currentStreak"], 1)
        
        # Check attempt history
        self.assertEqual(len(user_data["attempt_history"]), 1)
        attempt = user_data["attempt_history"][0]
        self.assertEqual(attempt["question_id"], self.test_question_id)
        self.assertTrue(attempt["is_correct"])
        logger.debug("Completed test_submit_correct_answer")

    def test_submit_incorrect_answer(self):
        """Test submitting an incorrect answer"""
        logger.debug("Starting test_submit_incorrect_answer")
        url = "http://127.0.0.1:5000/submit-answer"
        
        # Get the question data first to verify the correct answer
        question_ref = self.db.collection("questions").document(self.test_question_id)
        question_doc = question_ref.get()
        question_data = question_doc.to_dict()
        logger.debug(f"Question data for test: {question_data}")
        
        # Use an incorrect answer
        payload = {
            "uid": self.test_uid,
            "question_id": self.test_question_id,
            "selected_option": "This is an incorrect answer"  # Use a clearly incorrect answer
        }
        logger.debug(f"Test payload: {payload}")
        
        response = requests.post(url, json=payload)
        if response.status_code != 200:
            logger.error(f"Error response: {response.text}")
        self.assertEqual(response.status_code, 200)
        
        data = response.json()
        self.assertFalse(data["correct"])
        self.assertEqual(data["awardedPoints"], 0)
        
        # Verify user document was updated correctly
        user_ref = self.db.collection("users").document(self.test_uid)
        user_data = user_ref.get().to_dict()
        
        # Check topic performance
        topic_stats = user_data["performance"]["Arrays"]
        self.assertEqual(topic_stats["totalQuestions"], 1)
        self.assertEqual(topic_stats["correctAnswers"], 0)
        self.assertEqual(topic_stats["totalPoints"], 0)
        self.assertEqual(topic_stats["accuracy"], 0)
        
        # Check overall stats
        overall_stats = user_data["overall_stats"]
        self.assertEqual(overall_stats["totalQuestions"], 1)
        self.assertEqual(overall_stats["correctAnswers"], 0)
        self.assertEqual(overall_stats["totalPoints"], 0)
        self.assertEqual(overall_stats["currentStreak"], 0)
        logger.debug("Completed test_submit_incorrect_answer")

if __name__ == '__main__':
    unittest.main() 