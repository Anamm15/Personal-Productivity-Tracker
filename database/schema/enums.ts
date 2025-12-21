import { pgEnum } from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELED",
]);

export const reminderStatusEnum = pgEnum("reminder_status", [
  "PENDING",
  "SENT",
]);
