import { z } from "zod";
import { chapters } from "@/lib/chapters";

const chapterIds = chapters.map((chapter) => chapter.id) as [
  (typeof chapters)[number]["id"],
  ...(typeof chapters)[number]["id"][],
];

export const chapterIdSchema = z.enum(chapterIds);

export const envDataSchema = z.object({
  temp: z.number().int().min(-60).max(100),
  co2: z.number().int().min(250).max(2000),
  pm25: z.number().int().min(0).max(300),
  humidity: z.number().int().min(0).max(100),
});

export const gaiaGenerateInputSchema = z.object({
  memory: z.string().trim().min(1).max(240),
  chapter: chapterIdSchema,
  envData: envDataSchema,
  ecoQuote: z.string().trim().min(1).max(220),
});
