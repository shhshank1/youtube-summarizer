import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def summarize_transcript(transcript: str) -> dict:
    prompt = f"""
You are a helpful assistant that summarizes YouTube videos.

Given the following transcript, provide:
1. A clear summary (3-5 sentences)
2. 5 key takeaways as bullet points

Transcript:
{transcript}

Respond in this exact format:
SUMMARY:
<your summary here>

KEY TAKEAWAYS:
- <takeaway 1>
- <takeaway 2>
- <takeaway 3>
- <takeaway 4>
- <takeaway 5>
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000,
    )

    raw = response.choices[0].message.content

    # Parse the response
    summary = ""
    takeaways = []

    if "SUMMARY:" in raw and "KEY TAKEAWAYS:" in raw:
        parts = raw.split("KEY TAKEAWAYS:")
        summary = parts[0].replace("SUMMARY:", "").strip()
        takeaways = [line.strip("- ").strip() for line in parts[1].strip().split("\n") if line.strip().startswith("-")]

    return {"summary": summary, "key_takeaways": takeaways}