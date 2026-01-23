import { milestones } from "@/database/schema/milestone";
import { db } from "@/lib/db";
import { AppError } from "@/lib/exceptions";
import {
  CreateMilestoneRequest,
  MilestoneResponse,
} from "@/types/dto/milestone";
import { eq } from "drizzle-orm";

export async function insertMilestone(
  userId: string,
  goalId: string,
  milestone: CreateMilestoneRequest,
): Promise<MilestoneResponse> {
  const insertedMilestone = await db
    .insert(milestones)
    .values({ ...milestone, userId, goalId })
    .returning();

  if (!insertedMilestone || insertedMilestone.length === 0) {
    throw new AppError("Failed to create milestone", 500);
  }

  return insertedMilestone[0];
}

export async function updateStatusMilestone(
  id: string,
  isCompleted: boolean,
): Promise<MilestoneResponse> {
  const updatedMilestone = await db
    .update(milestones)
    .set({ isCompleted })
    .where(eq(milestones.id, id))
    .returning();
  return updatedMilestone[0];
}

export async function deleteMilestone(id: string) {
  const deletedMilestone = await db
    .delete(milestones)
    .where(eq(milestones.id, id))
    .returning();
  return deletedMilestone[0];
}
