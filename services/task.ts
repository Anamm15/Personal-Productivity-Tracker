import api from "@/lib/api";
import { TaskCreateRequest } from "@/types/dto/task";

export const GetTasks = (date: string) => api.get(`/tasks?date=${date}`);
export const CreateTask = (task: TaskCreateRequest) => api.post("/tasks", task);
export const UpdateTask = (id: string, task: TaskCreateRequest) =>
  api.put(`/tasks/${id}`, task);
export const DeleteTask = (id: string) => api.delete(`/tasks/${id}`);
