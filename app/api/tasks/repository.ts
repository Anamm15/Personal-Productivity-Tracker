import { db } from "@/lib/db";
import { eq, and, or, asc } from "drizzle-orm";
import { tasks } from "@/database/schema/task";
import { Task, TaskCreateRequest, TaskResponse } from "@/types/dto/task";
import { AppError } from "@/lib/exceptions";

export async function getByTaskId(id: string): Promise<TaskResponse> {
  const task = await db.select().from(tasks).where(eq(tasks.id, id));
  if (task.length === 0) {
    throw new AppError("Task not found", 404);
  }
  return task[0];
}

export async function getTaskByUserAndId(
  userId: string,
  id: string,
): Promise<TaskResponse> {
  const task = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.userId, userId), eq(tasks.id, id)));
  if (task.length === 0) {
    throw new AppError("Task not found", 404);
  }
  return task[0];
}

export async function getTasksByUserId(
  userId: string,
): Promise<TaskResponse[]> {
  const userTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, userId));
  return userTasks;
}

export async function findTasksByDateAndUser(
  date: string,
  userId: string,
): Promise<TaskResponse[]> {
  const tasksQuery = await db
    .select()
    .from(tasks)
    .where(
      or(
        and(eq(tasks.date, date), eq(tasks.userId, userId)),
        eq(tasks.isDaily, true),
      ),
    )
    .orderBy(asc(tasks.startTime));

  if (tasksQuery.length === 0) {
    return [];
  }

  return tasksQuery;
}

export async function insertTask(
  userId: string,
  taskData: TaskCreateRequest,
): Promise<TaskResponse[]> {
  const result = await db
    .insert(tasks)
    .values({ ...taskData, userId })
    .returning();

  if (!result || result.length === 0) {
    throw new AppError("Failed to insert task", 500);
  }

  return result;
}

export async function updateTask(id: string, taskData: Task) {
  const result = await db
    .update(tasks)
    .set(taskData)
    .where(eq(tasks.id, id))
    .returning();
  return result[0];
}

export async function deleteTask(id: string) {
  const result = await db.delete(tasks).where(eq(tasks.id, id)).returning();
  return result[0];
}
