import { db } from "@/lib/db";
import { and, eq, gte, lte, or } from "drizzle-orm";
import { goals } from "@/database/schema/goal";
import { AppError } from "@/lib/exceptions";
import { CreateGoalRequest, GoalResponse } from "@/types/dto/goal";
import { localISODate } from "@/utils/datetime";

export async function getUserGoalById(
  id: string,
  userId: string,
): Promise<GoalResponse> {
  const goal = await db
    .select()
    .from(goals)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .limit(1);

  if (!goal) {
    throw new AppError("Goal not found", 404);
  }
  return goal[0];
}

export async function getActiveUserGoals(
  userId: string,
  startOfMonth: string,
  endOfMonth: string,
): Promise<GoalResponse[]> {
  const goalsData = await db.query.goals.findMany({
    where: and(
      eq(goals.userId, userId),
      or(lte(goals.start, endOfMonth), gte(goals.deadline, startOfMonth)),
    ),
    with: {
      milestones: true,
    },
    orderBy: (goals, { asc }) => [asc(goals.start)],
  });

  if (goalsData.length === 0) {
    return [];
  }

  return goalsData;
}

export async function insertGoal(
  userId: string,
  goal: CreateGoalRequest,
): Promise<GoalResponse> {
  const insertedGoal = await db
    .insert(goals)
    .values({
      ...goal,
      userId,
      start: localISODate(new Date(goal.start)).isoDate,
      deadline: localISODate(new Date(goal.deadline)).isoDate,
    })
    .returning();
  if (!insertedGoal || insertedGoal.length === 0) {
    throw new AppError("Failed to insert goal", 500);
  }
  return insertedGoal[0];
}

export async function updateGoal(
  id: string,
  userId: string,
  goal: GoalResponse,
): Promise<GoalResponse> {
  const updatedGoal = await db
    .update(goals)
    .set(goal)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning();

  return updatedGoal[0];
}

export async function deleteGoal(id: string, userId: string) {
  const deletedGoal = await db
    .delete(goals)
    .where(and(eq(goals.id, id), eq(goals.userId, userId)))
    .returning();
  return deletedGoal[0];
}
