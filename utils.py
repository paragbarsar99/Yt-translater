import re
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.exceptions import TranscriptsDisabled, NoTranscriptFound

def extract_video_id(url):
    """Extract the video ID from a YouTube URL."""
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)',
        r'youtube.com/shorts/([^&\n?#]+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    
    raise ValueError("Invalid YouTube URL format")

def get_video_transcript(video_id):
    """Get the transcript of a YouTube video."""
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Combine all transcript pieces into one text
        full_transcript = " ".join([entry['text'] for entry in transcript_list])
        
        # Clean up the transcript
        cleaned_transcript = re.sub(r'\s+', ' ', full_transcript).strip()
        return cleaned_transcript
        
    except (TranscriptsDisabled, NoTranscriptFound):
        return None
    except Exception as e:
        raise Exception(f"Error fetching transcript: {str(e)}")
