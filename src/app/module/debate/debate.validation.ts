import { z } from "zod";

export const createDebateSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    duration: z.number().optional(),
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
