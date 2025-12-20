import { milestones } from "@/database/schema/milestone";
import { db } from "@/lib/db";
import { AppError } from "@/lib/exceptions";
import { CreateMilestoneRequest } from "@/types/dto/milestone";

export async function CreateMilestone(
  userId: string,
  goalId: string,
  milestone: CreateMilestoneRequest
) {
  const insertedMilestone = await db
    .insert(milestones)
    .values({ ...milestone, userId, goalId })
    .returning();

  if (!insertedMilestone || insertedMilestone.length === 0) {
    throw new AppError("Failed to create milestone", 500);
  }

  return insertedMilestone[0];
}
