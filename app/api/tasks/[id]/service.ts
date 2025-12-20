import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { tasks } from "@/database/schema/task";
import { AppError } from "@/lib/exceptions";
import { TaskResponse, TaskUpdateRequest } from "@/types/dto/task";

export async function GetById(
  id: string,
  userId: string
): Promise<TaskResponse> {
  const taskQuery = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .limit(1);

  if (taskQuery.length === 0) {
    throw new AppError("Task not found", 404);
  }

  return taskQuery[0];
}

export async function Update(
  id: string,
  userId: string,
  task: TaskUpdateRequest
) {
  const existingTask = await db
    .select()
    .from(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .limit(1);

  if (existingTask.length === 0) {
    throw new AppError("Task not found", 404);
  }

  if (task.title !== undefined && task.title !== "") {
    existingTask[0].title = task.title as string;
  }

  if (task.description !== undefined && task.description !== "") {
    existingTask[0].description = task.description as string;
  }

  if (task.startTime !== undefined && task.startTime !== "") {
    existingTask[0].startTime = task.startTime as string;
  }

  if (task.endTime !== undefined && task.endTime !== "") {
    existingTask[0].endTime = task.endTime as string;
  }

  if (task.status !== undefined && task.status !== existingTask[0].status) {
    existingTask[0].status = task.status;
  }

  const updatedTask = await db
    .update(tasks)
    .set(task)
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();

  return updatedTask[0];
}

export async function Delete(id: string) {
  const deletedTask = await db
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning();
  return deletedTask[0];
}
