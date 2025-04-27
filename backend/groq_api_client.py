# import requests
# from config import GROQ_API_KEY, GROQ_API_URL


# def audio_to_text_groq(audio_file_path):
#     headers = {
#         "Authorization": f"Bearer {GROQ_API_KEY}",
#     }

#     # Open the audio file
#     files = {
#         "file": open(audio_file_path, "rb")
#     }

#     # Additional parameters (can tweak if Groq's API needs model hint, etc.)
#     data = {
#         "model": "whisper-large",  # or whisper-small, whisper-medium depending on what Groq offers
#         "language": "en"  # Optional: specify "en" or leave for auto-detection
#     }

#     response = requests.post(GROQ_API_URL, headers=headers, files=files, data=data)

#     if response.status_code == 200:
#         transcript = response.json()['text']
#         return transcript
#     else:
#         raise Exception(f"Groq API Error: {response.status_code} {response.text}")

# import requests
# import json

# class GroqClient:
#     def __init__(self, api_key):
#         self.api_key = api_key
#         self.base_url = "https://api.groq.com/v1"

#     def transcribe(self, audio_data, audio_format):
#         headers = {
#             "Authorization": f"Bearer {self.api_key}",
#             "Content-Type": f"audio/{audio_format}"
#         }

#         response = requests.post(f"{self.base_url}/transcribe", headers=headers, data=audio_data)
        
#         if response.status_code == 200:
#             transcript = response.json()['text']
#             return transcript
#         else:
#             raise Exception(f"Error: {response.status_code}")


# from flask import Flask, request, jsonify
# from groq_client import GroqClient

# app = Flask(__name__)

# # Initialize Groq client with your API key
# groq_client = GroqClient("GROQ_API_KEY")

# @app.route("/transcribe", methods=["POST"])
# def transcribe_audio():
#     # Get audio data from request
#     audio_data = request.files["audio"]
#     audio_format = audio_data.filename.split(".")[-1]

#     # Transcribe audio using Groq client
#     try:
#         transcribed_text = groq_client.transcribe(audio_data.read(), audio_format)
#         return jsonify({"text": transcribed_text})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)
