# YouTube Video Summarizer

A Streamlit web application that generates AI-powered summaries of YouTube videos using their transcripts.

## Features
- Extract transcripts from YouTube videos
- Generate summaries in different lengths (Short, Medium, Detailed)
- Clean and responsive user interface
- Error handling for videos without captions

## Setup
1. Ensure you have Python 3.11+ installed
2. Install required packages:
```bash
pip install streamlit openai youtube-transcript-api
```
3. Set up your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY='your-api-key'
```

## Running the App
```bash
streamlit run main.py
```

## Components
- `main.py`: Main Streamlit interface
- `utils.py`: YouTube transcript extraction
- `summarizer.py`: OpenAI-powered summarization
- `styles.py`: Custom CSS styling

## Usage
1. Enter a YouTube video URL
2. Select desired summary length
3. Click "Generate Summary" to get an AI-powered summary of the video content
