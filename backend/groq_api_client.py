import requests
import os
from config import GROQ_API_KEY, GROQ_API_URL

def speech_to_text(audio_file_path):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
    }

    files = {
        'file': open(audio_file_path, 'rb'),
        'model': (None, 'whisper-large-v3')  # <-- needed like this for multipart/form-data
    }

    response = requests.post(GROQ_API_URL, headers=headers, files=files)

    if response.status_code == 200:
        result = response.json()
        return result.get('text', '')
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None
    
def main():
    # Dynamically find the correct path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    audio_file_path = os.path.join(current_dir, "test_audio.m4a")
    
    transcription = speech_to_text(audio_file_path)
    if transcription:
        print(f"Transcription: {transcription}")
    else:
        print("Transcription failed.")

if __name__ == "__main__":
    main()