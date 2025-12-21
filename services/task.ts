import api from "@/lib/api";
import { TaskCreateRequest, TaskUpdateRequest } from "@/types/dto/task";

export const getTasks = async (date?: string) => {
  const dateParam = date ? `date=${date}` : "";
  const response = await api.get(`/tasks?${dateParam}`);
  return response.data.data;
};

export const getDetailTask = async (id: string) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.data;
};

export const createQuickTask = async (command: string) => {
  const response = await api.post(`/tasks/quick-add`, { command });
  return response.data.data;
};

export const createTask = async (task: TaskCreateRequest) => {
  const response = await api.post("/tasks", task);
  return response.data.data;
};

export const updateTask = async (id: string, task: TaskUpdateRequest) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
