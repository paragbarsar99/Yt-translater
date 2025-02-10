import os
import anthropic
from anthropic import Anthropic

# Initialize Anthropic client
client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# the newest Anthropic model is "claude-3-5-sonnet-20241022" which was released October 22, 2024

def generate_summary(transcript, length="Medium"):
    """Generate a summary of the transcript using Anthropic's Claude."""

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
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=config['max_tokens'],
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        summary = response.content[0].text
        return summary.strip()

    except Exception as e:
        raise Exception(f"Error generating summary: {str(e)}")