import openai
import smtplib
import os
from flask import Flask, render_template, request
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs
from email.mime.text import MIMEText

# Load from environment
openai.api_key = os.environ["OPENAI_API_KEY"]
EMAIL_ADDRESS = os.environ["EMAIL_ADDRESS"]
EMAIL_PASSWORD = os.environ["EMAIL_PASSWORD"]
TO_EMAIL = os.environ["TO_EMAIL"]

app = Flask(__name__)

def extract_video_id(url):
    query = parse_qs(urlparse(url).query)
    return query["v"][0]

def get_transcript(video_url):
    video_id = extract_video_id(video_url)
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    return " ".join([entry["text"] for entry in transcript])

def summarize_text(text):
    prompt = f"Summarize the following YouTube transcript into 5-7 bullet points:\n\n{text}"
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=500
    )
    return response.choices[0].message["content"]

def send_email(subject, body):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = TO_EMAIL

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.sendmail(EMAIL_ADDRESS, TO_EMAIL, msg.as_string())

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        youtube_url = request.form["youtube_url"]
        try:
            transcript = get_transcript(youtube_url)
            summary = summarize_text(transcript)
            send_email("YouTube Summary", summary)
            return render_template("success.html")
        except Exception as e:
            return render_template("error.html", error=str(e))
    return render_template("index.html")