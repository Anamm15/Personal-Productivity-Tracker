import { pgEnum } from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
]);

export const reminderStatusEnum = pgEnum("reminder_status", [
  "PENDING",
  "SENT",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "ACTIVE",
  "COMPLETED",
  "ARCHIVED",
]);

export const projectTaskPriorityEnum = pgEnum("project_task_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
]);
