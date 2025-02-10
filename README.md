git clone [your-repo-url]
cd youtube-video-summarizer
```

2. Install the required packages:
```bash
pip install streamlit openai youtube-transcript-api
```

3. Set up your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY='your-api-key'
```

## Running the Application
```bash
streamlit run main.py