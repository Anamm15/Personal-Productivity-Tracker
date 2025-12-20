import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { projects } from "./project";
import { goals } from "./goal";
import { tasks } from "./task";
import { activityLogs } from "./activity-log";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  goals: many(goals),
  activityLogs: many(activityLogs),
  tasks: many(tasks),
}));
