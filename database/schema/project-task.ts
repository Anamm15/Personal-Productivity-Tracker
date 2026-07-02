import { pgTable, uuid, text, timestamp, date } from "drizzle-orm/pg-core";
import { sprints } from "./sprint";
import { relations } from "drizzle-orm";
import { projectTaskPriorityEnum } from "./enums";
import { taskStatusEnum } from "./enums";

export const projectTasks = pgTable("project_tasks", {
  id: uuid("id").defaultRandom().primaryKey(),

  sprintId: uuid("sprint_id")
    .notNull()
    .references(() => sprints.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  description: text("description"),

  status: taskStatusEnum("status").default("PENDING").notNull(),
  priority: projectTaskPriorityEnum("priority").default("MEDIUM").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const projectTaskRelations = relations(projectTasks, ({ one }) => ({
  sprint: one(sprints, {
    fields: [projectTasks.sprintId],
    references: [sprints.id],
  }),
}));
