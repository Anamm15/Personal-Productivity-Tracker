import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as goalSchema from "@/database/schema/goal";
import * as milestoneSchema from "@/database/schema/milestone";
import * as taskSchema from "@/database/schema/task";
import * as userSchema from "@/database/schema/user";
import * as projectSchema from "@/database/schema/project";
import * as activitySchema from "@/database/schema/activity-log";

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
  },
});
