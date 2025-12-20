import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { tasks } from "@/database/schema/task";
import { AppError } from "@/lib/exceptions";
import { TaskCreateRequest, TaskResponse } from "@/types/dto/task";

export async function GetTasks(
  date: string,
  userId: string
): Promise<TaskResponse[]> {
  const tasksQuery = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.date, date), eq(tasks.userId, userId)));

  if (tasksQuery.length === 0) {
    throw new AppError("No tasks found", 404);
  }

  return tasksQuery;
}

export async function CreateTask(
  userId: string,
  task: TaskCreateRequest
): Promise<TaskResponse> {
  const insertedTask = await db
    .insert(tasks)
    .values({ ...task, userId })
    .returning();

  if (!insertedTask || insertedTask.length === 0) {
    throw new AppError("Failed to create task", 500);
  }

  return insertedTask[0];
}
