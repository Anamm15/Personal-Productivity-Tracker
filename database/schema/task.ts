import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  varchar,
  time,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { taskStatusEnum } from "./enums";

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  description: text("description"),

  startTime: time("start_time"),
  endTime: time("end_time"),
  date: date("date"),

  tags: text("tags").array(),
  color: varchar("color", { length: 50 }),

  reminder: time("reminder"),

  status: taskStatusEnum("status").default("PENDING").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
