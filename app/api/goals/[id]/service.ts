import { GoalResponse, UpdateGoalRequest } from "@/types/dto/goal";
import { localISODate } from "@/utils/datetime";
import { deleteGoal, getUserGoalById, updateGoal } from "../repository";

export async function Update(
  id: string,
  userId: string,
  goal: UpdateGoalRequest,
): Promise<GoalResponse> {
  const existingGoal = await getUserGoalById(id, userId);
  if (goal.title !== undefined && goal.title !== "") {
    existingGoal.title = goal.title as string;
  }

  if (goal.description !== undefined && goal.description !== "") {
    existingGoal.description = goal.description as string;
  }

  if (goal.category !== undefined && goal.category !== "") {
    existingGoal.category = goal.category as string;
  }

  if (goal.motivation !== undefined && goal.motivation !== "") {
    existingGoal.motivation = goal.motivation as string;
  }

  if (goal.reward !== undefined && goal.reward !== "") {
    existingGoal.reward = goal.reward as string;
  }

  if (goal.theme !== undefined && goal.theme !== "") {
    existingGoal.theme = goal.theme as string;
  }

  if (goal.deadline !== undefined && goal.deadline !== "") {
    const { isoDate } = localISODate(new Date(goal.deadline));
    existingGoal.deadline = isoDate;
  }

  const updatedGoal = await updateGoal(id, userId, existingGoal);
  return updatedGoal;
}

export async function Delete(id: string, userId: string) {
  const deletedGoal = await deleteGoal(id, userId);
  return deletedGoal;
}
