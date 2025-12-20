import { z } from "zod";

export const updateGoalSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title is too long")
    .optional(),

  description: z.string().optional(),

  category: z.string().min(1, "Category is required").optional(),

  start: z
    .string()
    .datetime({ message: "Start must be a valid ISO timestamp" })
    .optional(),

  deadline: z
    .string()
    .datetime({ message: "Deadline must be a valid ISO timestamp" })
    .optional(),

  motivation: z.string().optional(),
  reward: z.string().optional(),
  theme: z.string().optional(),
});
