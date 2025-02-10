import OpenAI from "openai";
import type { VideoMetadata } from "@shared/youtube";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateSummary(video: VideoMetadata): Promise<string> {
  const prompt = `Please provide a comprehensive summary of this YouTube video.
Title: ${video.title}
Description: ${video.description}

Please summarize the key points and main takeaways in a clear, concise manner. Format the response in paragraphs and use natural language.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content || "Unable to generate summary";
}