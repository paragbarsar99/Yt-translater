export interface VideoMetadata {
  videoId: string;
  videoUrl: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
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
