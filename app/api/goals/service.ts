import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { goals } from "@/database/schema/goal";
import { AppError } from "@/lib/exceptions";
import { CreateGoalRequest } from "@/types/dto/goal";

export async function GetGoals(userId: string) {
  const goalsData = await db.query.goals.findMany({
    where: eq(goals.userId, userId),
    with: {
      milestones: true,
    },
  });

  if (goalsData.length === 0) {
    throw new AppError("No goals found", 404);
  }

  return goalsData;
}

export async function CreateGoal(userId: string, goal: CreateGoalRequest) {
  const insertedGoal = await db
    .insert(goals)
    .values({
      ...goal,
      userId,
      start: new Date(goal.start),
      deadline: new Date(goal.deadline),
    })
    .returning();

  if (!insertedGoal || insertedGoal.length === 0) {
    throw new AppError("Failed to create goal", 500);
  }

  return insertedGoal[0];
}
