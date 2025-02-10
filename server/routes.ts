import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { youtubeUrlSchema, type InsertSummary } from "@shared/schema";
import { extractVideoId, type VideoMetadata, fetchSubtitles } from "@shared/youtube";
import { generateSummary } from "./openai";
import youtubeDl from "youtube-dl-exec";

export function registerRoutes(app: Express) {
  app.post("/api/summarize", async (req, res) => {
    try {
      const { url } = await youtubeUrlSchema.parseAsync(req.body);

      const videoId = extractVideoId(url);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      // Check cache
      const cached = await storage.getSummary(videoId);
      if (cached) {
        return res.json(cached);
      }

      // Get video metadata
      const metadata = await youtubeDl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
      }) as any;

      // Fetch subtitles
      const subtitles = await fetchSubtitles(videoId);

      const videoMetadata: VideoMetadata = {
        videoId,
        videoUrl: url,
        title: metadata.title,
        thumbnail: metadata.thumbnail,
        duration: metadata.duration_string,
        description: metadata.description,
        subtitles
      };

      // Generate summary
      const summary = await generateSummary(videoMetadata);

      // Store and return result
      const summaryData: InsertSummary = {
        videoId,
        videoUrl: url,
        title: videoMetadata.title,
        thumbnail: videoMetadata.thumbnail,
        duration: videoMetadata.duration,
        summary,
      };

      const result = await storage.createSummary(summaryData);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}