import { summaries, type Summary, type InsertSummary } from "@shared/schema";

export interface IStorage {
  createSummary(summary: InsertSummary): Promise<Summary>;
  getSummary(videoId: string): Promise<Summary | undefined>;
}

export class MemStorage implements IStorage {
  private summaries: Map<string, Summary>;
  private currentId: number;

  constructor() {
    this.summaries = new Map();
    this.currentId = 1;
  }

  async createSummary(summary: InsertSummary): Promise<Summary> {
    const id = this.currentId++;
    const newSummary: Summary = {
      ...summary,
      id,
      createdAt: new Date(),
    };
    this.summaries.set(summary.videoId, newSummary);
    return newSummary;
  }

  async getSummary(videoId: string): Promise<Summary | undefined> {
    return this.summaries.get(videoId);
  }
}

export const storage = new MemStorage();
