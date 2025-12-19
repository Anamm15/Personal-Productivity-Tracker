import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { projects } from "./project";
import { taskStatusEnum } from "./enums";

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  projectId: uuid("project_id").references(() => projects.id),

  title: text("title").notNull(),
  description: text("description"),

  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  date: date("date"),

  tags: text("tags").array(), // String[]
  color: varchar("color", { length: 50 }),

  reminder: timestamp("reminder"),

  status: taskStatusEnum("status").default("PENDING").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
