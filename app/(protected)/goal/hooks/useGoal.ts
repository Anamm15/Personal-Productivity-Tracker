import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
  addMilestone,
  updateStatusMilestone,
  deleteMilestone,
} from "@/services/goal";
import { GoalResponse, UpdateGoalRequest } from "@/types/dto/goal";
import { toast } from "sonner";

export const useGoalsQuery = (date: string) => {
  return useQuery<GoalResponse[] | null>({
    queryKey: ["goals"],
    queryFn: () => getGoals(date),
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoal,

    onMutate: () => {
      const toastId = toast.loading("Creating goal");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });

      toast.success("Goal Created successfully", {
        id: context?.toastId,
        duration: 3000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while creating goal";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
      console.log(error);
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGoal,

    onMutate: () => {
      const toastId = toast.loading("Deleting goal");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal Deleted successfully", {
        id: context?.toastId,
        duration: 3000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting goal";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
      console.log(error);
    },
  });
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGoalRequest }) =>
      updateGoal(id, data),

    onMutate: () => {
      const toastId = toast.loading("Updating goal");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal Updated successfully", {
        id: context?.toastId,
        duration: 3000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while updating goal";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
      console.log(error);
    },
  });
};

export const useAddMilestone = () => {
  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      addMilestone(id, title),

    onMutate: () => {
      const toastId = toast.loading("Adding milestone");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      toast.success("Milestone Added successfully", {
        id: context?.toastId,
        duration: 3000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while adding milestone";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
      console.log(error);
    },
  });
};

export const useUpdateStatusMilestone = () => {
  return useMutation({
    mutationFn: ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
      updateStatusMilestone(id, isCompleted),

    onMutate: () => {
      const toastId = toast.loading("Updating milestone");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      toast.success("Milestone Updated successfully", {
        id: context?.toastId,
        duration: 3000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while updating milestone";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
      console.log(error);
    },
  });
};

export const useDeleteMilestone = () => {
  return useMutation({
    mutationFn: deleteMilestone,

    onMutate: () => {
      const toastId = toast.loading("Deleting milestone");
      return { toastId };
    },

    onSuccess: (data, variables, context) => {
      toast.success("Milestone Deleted successfully", {
        id: context?.toastId,
        duration: 3000,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables, context) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting milestone";

      toast.error(message, {
        id: context?.toastId,
        duration: 4000,
      });
      console.log(error);
    },
  });
};
