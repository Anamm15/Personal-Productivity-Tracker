import { insertMilestone } from "@/app/api/milestones/repository";
import {
  CreateMilestoneRequest,
  MilestoneResponse,
} from "@/types/dto/milestone";

export async function CreateMilestone(
  userId: string,
  goalId: string,
  milestone: CreateMilestoneRequest,
): Promise<MilestoneResponse> {
  const insertedMilestone = await insertMilestone(userId, goalId, milestone);
  return insertedMilestone;
}
