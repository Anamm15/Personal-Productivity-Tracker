import { z } from "zod";

export const createGoalSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(255, "Title is too long"),

    description: z.string().optional(),

    category: z.string().min(1, "Category is required"),

    start: z
      .string()
      .regex(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
        "Invalid date format (YYYY-MM-DD)"
      ),

    deadline: z
      .string()
      .regex(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
        "Invalid date format (YYYY-MM-DD)"
      ),

    motivation: z.string().optional(),
    reward: z.string().optional(),
    theme: z.string().optional(),
  })
  .refine((data) => new Date(data.deadline) > new Date(data.start), {
    message: "Deadline must be after start time",
    path: ["deadline"],
  });
