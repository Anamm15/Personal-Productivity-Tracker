import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),

  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .optional(),

  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .optional(),

  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"])
    .optional(),
});
