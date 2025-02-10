import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VideoMetadata } from "@shared/youtube";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function generateSummary(video: VideoMetadata): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Please provide a comprehensive summary of this YouTube video.
Title: ${video.title}
Description: ${video.description}
Subtitles: ${video.subtitles || 'Not available'}

Please analyze the content and create a detailed summary with the following format:
1. Main topic or theme (2-3 sentences)
2. Key Points (in bullet points)
3. Important highlights or timestamps (if available)
4. Conclusion or main takeaways (in bullet points)

Make sure to organize the information clearly and use bullet points where appropriate.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Unable to generate summary";
  } catch (error: any) {
    console.error("Error generating summary:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}