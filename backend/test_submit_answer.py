import requests

url = "http://127.0.0.1:5000/submit-answer"

payload = {
    "uid": "2HqPtr1xCmfAun9d5AxQ5nhQ5b53",  # Replace with actual user ID from Firestore
    "question_id": "1057194584366214279",  # Replace with an actual question ID (document ID in Firestore)
    "selected_option": "8"
}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
