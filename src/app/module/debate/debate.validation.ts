import { z } from "zod";

export const createDebateSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    category: z.string(),
    image: z.string().optional(),
    duration: z.number(),
  }),
});

export const joinDebateSchema = z.object({
  body: z.object({
    side: z.enum(["support", "oppose"]),
  }),
  params: z.object({
    id: z.string(),
  }),
});
