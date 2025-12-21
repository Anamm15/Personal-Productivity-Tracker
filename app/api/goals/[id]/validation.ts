import { z } from "zod";

export const updateGoalSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title is too long")
    .optional(),

  description: z.string().optional(),

  category: z.string().min(1, "Category is required").optional(),

  start: z.string().date({ message: "Start must valid format" }).optional(),

  deadline: z
    .string()
    .date({ message: "Deadline must valid format" })
    .optional(),

  motivation: z.string().nullable().optional(),
  reward: z.string().nullable().optional(),
  theme: z.string().nullable().optional(),
});
