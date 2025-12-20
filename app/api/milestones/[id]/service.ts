import { milestones } from "@/database/schema/milestone";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function UpdateStatus(id: string, isCompleted: boolean) {
  const updatedMilestone = await db
    .update(milestones)
    .set({ isCompleted })
    .where(eq(milestones.id, id))
    .returning();
  return updatedMilestone[0];
}

export async function Delete(id: string) {
  const deletedMilestone = await db
    .delete(milestones)
    .where(eq(milestones.id, id))
    .returning();
  return deletedMilestone[0];
}
