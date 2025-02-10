import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VideoMetadata } from "@shared/youtube";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function generateSummary(video: VideoMetadata): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Please provide a comprehensive summary of this YouTube video.
Title: ${video.title}
Description: ${video.description}

Please summarize the key points and main takeaways in a clear, concise manner. Format the response in paragraphs and use natural language.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Unable to generate summary";
  } catch (error: any) {
    console.error("Error generating summary:", error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}