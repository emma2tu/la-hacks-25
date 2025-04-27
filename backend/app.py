# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from main import fill_info_cards

app = Flask(__name__)
CORS(app)  # allow CORS for all routes (so React can talk to Flask)

@app.route('/')
def index():
    return "Welcome to the Research Assistant API!"

@app.route('/api/home-chat', methods=['POST'])
def home_chat():
    data = request.get_json()
    user_text = data.get('text', '')

    print(f"Received input: {user_text}")

    if not user_text:
        return jsonify({"error": "No input found"}), 400
    else:
        cards = fill_info_cards(text_input=user_text)
        print(f"Generated cards: {cards}")

    return jsonify({"cards": cards})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5004, debug=True)