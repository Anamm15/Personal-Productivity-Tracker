import { db } from "@/lib/db";
import { and, eq, gte, lte, or } from "drizzle-orm";
import { goals } from "@/database/schema/goal";
import { AppError } from "@/lib/exceptions";
import { CreateGoalRequest } from "@/types/dto/goal";
import { getEndOfMonth, localISODate } from "@/utils/datetime";

export async function GetGoals(userId: string, dateStr: string) {
  const startDateObj = new Date(dateStr);
  const { isoDate: startOfMonth } = localISODate(startDateObj);
  const endOfMonth = getEndOfMonth(startDateObj);
  const goalsData = await db.query.goals.findMany({
    where: and(
      eq(goals.userId, userId),
      or(lte(goals.start, endOfMonth), gte(goals.deadline, startOfMonth))
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

export async function CreateGoal(userId: string, goal: CreateGoalRequest) {
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
    throw new AppError("Failed to create goal", 500);
  }

  return insertedGoal[0];
}
