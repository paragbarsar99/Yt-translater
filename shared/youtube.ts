import axios from 'axios';
import { getSubtitles } from 'youtube-captions-scraper';

export interface VideoMetadata {
  videoId: string;
  videoUrl: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  subtitles?: string;
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu.be\/)([^&\n?#]+)/,
    /youtube.com\/shorts\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export async function fetchSubtitles(videoId: string): Promise<string> {
  try {
    const captions = await getSubtitles({
      videoID: videoId,
      lang: 'en' // default to English
    });

    // Combine all caption text with timestamps
    return captions
      .map(caption => caption.text)
      .join(' ');
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    return ''; // Return empty string if subtitles aren't available
  }
}