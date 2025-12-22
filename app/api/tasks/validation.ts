import { timeStringToMinutes } from "@/utils/datetime";
import { z } from "zod";

export const createTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title is too long")
      .trim(),

    description: z
      .string()
      .max(1000, "Description is too long")
      .optional()
      .default(""),

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

    color: z.string().optional().or(z.literal("")),

    tags: z
      .array(z.string().max(20, "Tag too long"))
      .max(5, "Maximum 5 tags allowed")
      .optional(),

    reminder: z.string().optional(),

    isPriority: z.boolean().optional(),
    tagPriority: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return (
        timeStringToMinutes(data.endTime) > timeStringToMinutes(data.startTime)
      );
    },
    {
      message: "endTime must be after startTime",
      path: ["endTime"],
    }
  );

// Kita bisa menyimpulkan type data input murni dari Zod ini
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
