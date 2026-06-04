# YouTube Summarizer

AI-powered web application that extracts YouTube video transcripts and generates structured summaries using Large Language Models (LLMs).

## Features

- Extract transcripts from YouTube videos
- Generate concise AI-powered summaries
- Produce key takeaways and insights
- Support multiple LLM providers
- Clean and responsive user interface

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS

**Backend**
- FastAPI
- Python

**AI**
- Groq API (LLaMA 3.3 70B)
- Google Gemini 2.0 Flash

**Deployment**
- Vercel
- Render

## How It Works

1. User submits a YouTube URL
2. Transcript is extracted from the video
3. Transcript is processed by an LLM
4. Structured summary and key insights are generated
5. Results are displayed in the frontend

## Key Highlights

- Integrated multiple LLM providers for summarization
- Implemented structured prompt engineering
- Handled API rate limits and large transcript processing
- Deployed full-stack application to cloud platforms

## Future Improvements
- Support for multilingual videos
- Chapter-wise summaries
- AI-generated quiz questions
- PDF export functionality
- Summary history and user accounts
- RAG-based video question answering

## Author
Built as a project to explore modern AI application development, prompt engineering, and production-grade LLM integrations.

## Known Limitation
- Transcript extraction may not work consistently on cloud deployments due to YouTube restrictions on certain server IP addresses used by hosting providers.
