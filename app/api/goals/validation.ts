import { z } from "zod";

export const createGoalSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(255, "Title is too long"),

    description: z.string().optional(),

    category: z.string().min(1, "Category is required"),

    start: z.string().date({ message: "Start must valid format" }),

    deadline: z.string().date({ message: "Deadline must valid format" }),

    motivation: z.string().optional(),
    reward: z.string().optional(),
    theme: z.string().optional(),
  })
  .refine((data) => new Date(data.deadline) > new Date(data.start), {
    message: "Deadline must be after start time",
    path: ["deadline"],
  });
