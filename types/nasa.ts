import { z } from "zod";

export const ApodSchema = z.object({
  title: z.string(),
  date: z.string(),
  explanation: z.string(),
  url: z.string(),
  media_type: z.enum(["image", "video"]),
  hdurl: z.string().optional(),
  copyright: z.string().optional(),
  service_version: z.string(),
  thumbnail_url: z.string().optional(),
});

export type ApodData = z.infer<typeof ApodSchema>;
