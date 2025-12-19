import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z
    .string()
    .regex(
      /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Invalid date format (YYYY-MM-DD)"
    ),

  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),

  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),

  status: z.boolean().optional(),
});
