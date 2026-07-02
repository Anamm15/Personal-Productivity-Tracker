import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { CreateSprintRequest, SprintResponse, UpdateSprintRequest } from "@/types/dto/sprint";
import { toast } from "sonner";

export function useCreateSprint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sprint: CreateSprintRequest) => {
      const { data } = await api.post<{ data: SprintResponse }>("/sprints", sprint);
      return data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects", variables.projectId] });
      toast.success("Sprint created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create sprint");
    },
  });
}

export function useUpdateSprint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateSprintRequest }) => {
      const response = await api.put<{ data: SprintResponse }>(`/sprints/${id}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      // Since sprint is nested in project details, we should ideally know projectId to invalidate
      // For now, invalidate all project details to be safe, or we can just invalidate "projects"
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Sprint updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update sprint");
    },
  });
}

export function useDeleteSprint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/sprints/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Sprint deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete sprint");
    },
  });
}
