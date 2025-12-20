import { goals } from "@/database/schema/goal";
import { db } from "@/lib/db";
import { AppError } from "@/lib/exceptions";
import { UpdateGoalRequest } from "@/types/dto/goal";
import { and, eq } from "drizzle-orm";

export async function Update(
  id: string,
  userId: string,
  goal: UpdateGoalRequest
) {
  const existingGoal = await db
    .select()
    .from(goals)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .limit(1);

  if (existingGoal.length === 0) {
    throw new AppError("Goal not found", 404);
  }

  if (goal.title !== undefined && goal.title !== "") {
    existingGoal[0].title = goal.title as string;
  }

  if (goal.description !== undefined && goal.description !== "") {
    existingGoal[0].description = goal.description as string;
  }

  if (goal.category !== undefined && goal.category !== "") {
    existingGoal[0].category = goal.category as string;
  }

  if (goal.motivation !== undefined && goal.motivation !== "") {
    existingGoal[0].motivation = goal.motivation as string;
  }

  if (goal.reward !== undefined && goal.reward !== "") {
    existingGoal[0].reward = goal.reward as string;
  }

  if (goal.theme !== undefined && goal.theme !== "") {
    existingGoal[0].theme = goal.theme as string;
  }

  if (goal.deadline !== undefined && goal.deadline !== "") {
    existingGoal[0].deadline = new Date(goal.deadline as string);
  }

  const updatedGoal = await db
    .update(goals)
    .set(existingGoal[0])
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning();
  return updatedGoal[0];
}

export async function Delete(id: string, userId: string) {
  const deletedGoal = await db
    .delete(goals)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning();
  return deletedGoal[0];
}
