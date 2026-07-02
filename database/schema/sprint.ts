import { pgTable, uuid, text, timestamp, date } from "drizzle-orm/pg-core";
import { projects } from "./project";
import { relations } from "drizzle-orm";
import { projectStatusEnum } from "./enums";
import { projectTasks } from "./project-task";

export const sprints = pgTable("sprints", {
  id: uuid("id").defaultRandom().primaryKey(),

  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  description: text("description"),

  startDate: date("start_date"),
  endDate: date("end_date"),

  status: projectStatusEnum("status").default("ACTIVE").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const sprintRelations = relations(sprints, ({ one, many }) => ({
  project: one(projects, { fields: [sprints.projectId], references: [projects.id] }),
  projectTasks: many(projectTasks),
}));
