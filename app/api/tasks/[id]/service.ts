import { TaskResponse, TaskUpdateRequest } from "@/types/dto/task";
import { deleteTask, getTaskByUserAndId, updateTask } from "../repository";

export async function GetById(
  id: string,
  userId: string,
): Promise<TaskResponse> {
  const taskQuery = await getTaskByUserAndId(userId, id);
  return taskQuery;
}

export async function Update(
  id: string,
  userId: string,
  task: TaskUpdateRequest,
) {
  const existingTask = await getTaskByUserAndId(userId, id);

  if (task.title !== undefined && task.title !== "") {
    existingTask.title = task.title as string;
  }

  if (task.description !== undefined && task.description !== "") {
    existingTask.description = task.description as string;
  }

  if (task.startTime !== undefined && task.startTime !== "") {
    existingTask.startTime = task.startTime as string;
  }

  if (task.endTime !== undefined && task.endTime !== "") {
    existingTask.endTime = task.endTime as string;
  }

  if (task.status !== undefined && task.status !== existingTask.status) {
    existingTask.status = task.status;
  }

  if (task.reminder !== undefined && task.reminder !== existingTask.reminder) {
    existingTask.reminder = task.reminder;
  }

  if (task.tags !== undefined && task.tags !== existingTask.tags) {
    existingTask.tags = task.tags;
  }

  const updatedTask = await updateTask(id, existingTask);
  return updatedTask;
}

export async function Delete(id: string) {
  const deletedTask = await deleteTask(id);
  return deletedTask;
}
