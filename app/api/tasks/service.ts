import { AppError } from "@/lib/exceptions";
import { TaskCreateRequest, TaskResponse } from "@/types/dto/task";
import { findTasksByDateAndUser, insertTask } from "./repository";

export async function GetTasks(
  date: string,
  userId: string,
): Promise<TaskResponse[]> {
  const tasks = await findTasksByDateAndUser(date, userId);
  return tasks;
}

export async function CreateTask(
  userId: string,
  task: TaskCreateRequest,
): Promise<TaskResponse> {
  const insertedTask = await insertTask(userId, task);
  if (!insertedTask || insertedTask.length === 0) {
    throw new AppError("Failed to create task", 500);
  }

  return insertedTask[0];
}
