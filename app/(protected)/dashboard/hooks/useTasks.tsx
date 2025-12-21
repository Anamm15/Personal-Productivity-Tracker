import {
  getTasks,
  createQuickTask,
  createTask,
  getDetailTask,
  updateTask,
  deleteTask,
} from "@/services/task";
import { TaskResponse, TaskUpdateRequest } from "@/types/dto/task";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTasks = (date?: string) => {
  return useQuery<TaskResponse[], Error>({
    queryKey: ["tasks", date],
    queryFn: () => getTasks(date),
  });
};

export const useDetailTask = (id: string) => {
  return useQuery<TaskResponse, Error>({
    queryKey: ["task", id],
    queryFn: () => getDetailTask(id),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onMutate: () => {
      const toastId = toast.loading("Creating task...");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast.success("Task Created successfully", {
        id: context?.toastId,
        duration: 4000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while creating task.";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
    },
  });
};

export const useQuickAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuickTask,

    onMutate: () => {
      const toastId = toast.loading("Creating task...");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast.success("Task Created successfully", {
        id: context?.toastId,
        duration: 4000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while creating task.";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TaskUpdateRequest }) =>
      updateTask(id, data),

    onMutate: () => {
      const toastId = toast.loading("Updating task...");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", variables.id] });

      toast.success("Task Updated successfully", {
        id: context?.toastId,
        duration: 4000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while updating task.";
      console.log(error);

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onMutate: () => {
      const toastId = toast.loading("Deleting task...");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      toast.success("Task Deleted successfully", {
        id: context?.toastId,
        duration: 4000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting task.";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
    },
  });
};
