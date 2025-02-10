import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const summaries = pgTable("summaries", {
  id: serial("id").primaryKey(),
  videoId: text("video_id").notNull(),
  videoUrl: text("video_url").notNull(),
  title: text("title").notNull(),
  thumbnail: text("thumbnail").notNull(),
  duration: text("duration").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSummarySchema = createInsertSchema(summaries).omit({
  id: true,
  createdAt: true,
});

export type InsertSummary = z.infer<typeof insertSummarySchema>;
export type Summary = typeof summaries.$inferSelect;

// For input validation
export const youtubeUrlSchema = z.object({
  url: z.string().url().refine((url) => {
    return url.includes("youtube.com/") || url.includes("youtu.be/");
  }, "Must be a valid YouTube URL"),
});
