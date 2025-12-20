import { getTasks, createQuickTask, createTask } from "@/services/task";
import { TaskResponse } from "@/types/dto/task";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useTasks = (date?: string) => {
  return useQuery<TaskResponse[], Error>({
    queryKey: ["tasks", date],
    queryFn: () => getTasks(date),
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,

    onMutate: () => {
      const toastId = toast.loading("Creating task...");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      toast.success("Task Created successfully", {
        id: context?.toastId,
        duration: 2000,
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
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const createQuickTaskHandler = async (command: string) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Waiting...");

    try {
      await createQuickTask(command);
      toast.success(`Task Created successfully`, {
        id: toastId,
        duration: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while creating task.";
      setError(message);
      toast.error(message, {
        id: toastId,
        duration: 4000,
      });
      console.error("Failed create task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createQuickTaskHandler,
    isLoading,
  };
};
