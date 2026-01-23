import { CreateGoalRequest } from "@/types/dto/goal";
import { getEndOfMonth, localISODate } from "@/utils/datetime";
import { getActiveUserGoals, insertGoal } from "./repository";

export async function GetGoals(userId: string, dateStr: string) {
  const startDateObj = new Date(dateStr);
  const { isoDate: startOfMonth } = localISODate(startDateObj);
  const endOfMonth = getEndOfMonth(startDateObj);
  const goals = await getActiveUserGoals(userId, startOfMonth, endOfMonth);
  return goals;
}

export async function CreateGoal(userId: string, goal: CreateGoalRequest) {
  const insertedGoal = await insertGoal(userId, goal);
  return insertedGoal;
}
