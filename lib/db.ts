import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as goalSchema from "@/database/schema/goal";
import * as milestoneSchema from "@/database/schema/milestone";
import * as taskSchema from "@/database/schema/task";
import * as userSchema from "@/database/schema/user";
import * as projectSchema from "@/database/schema/project";
import * as activitySchema from "@/database/schema/activity-log";
import * as sprintSchema from "@/database/schema/sprint";
import * as projectTaskSchema from "@/database/schema/project-task";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    ...goalSchema,
    ...milestoneSchema,
    ...taskSchema,
    ...userSchema,
    ...projectSchema,
    ...activitySchema,
    ...sprintSchema,
    ...projectTaskSchema,
  },
});
