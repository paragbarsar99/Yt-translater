import os
from openai import OpenAI

# the newest OpenAI model is "gpt-4o" which was released May 13, 2024.
# do not change this unless explicitly requested by the user
MODEL = "gpt-4o"

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def generate_summary(transcript, length="Medium"):
    """Generate a summary of the transcript using OpenAI."""
    
    # Configure prompt based on desired length
    length_configs = {
        "Short": {"max_tokens": 150, "detail": "Create a brief 2-3 sentence summary"},
        "Medium": {"max_tokens": 300, "detail": "Create a comprehensive paragraph summary"},
        "Detailed": {"max_tokens": 500, "detail": "Create a detailed summary with main points and key details"}
    }
    
    config = length_configs[length]
    
    prompt = f"""
    {config['detail']} of the following YouTube video transcript. 
    Focus on the main points and maintain a coherent narrative structure.
    Format the summary with proper spacing and organization.
    
    Transcript:
    {transcript}
    """

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are a skilled content summarizer."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=config['max_tokens'],
            temperature=0.7
        )
        
        summary = response.choices[0].message.content
        return summary.strip()
        
    except Exception as e:
        raise Exception(f"Error generating summary: {str(e)}")
