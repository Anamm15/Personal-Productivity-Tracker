import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { CreateProjectTaskRequest, ProjectTaskResponse, UpdateProjectTaskRequest } from "@/types/dto/project-task";
import { toast } from "sonner";

export function useCreateProjectTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: CreateProjectTaskRequest) => {
      const { data } = await api.post<{ data: ProjectTaskResponse }>("/project-tasks", task);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Task added to sprint");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create task");
    },
  });
}

export function useUpdateProjectTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProjectTaskRequest }) => {
      const response = await api.put<{ data: ProjectTaskResponse }>(`/project-tasks/${id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update task");
    },
  });
}

export function useDeleteProjectTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/project-tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Task deleted");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete task");
    },
  });
}
