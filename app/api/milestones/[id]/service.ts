import { deleteMilestone, updateStatusMilestone } from "../repository";

export async function UpdateStatus(id: string, isCompleted: boolean) {
  const updatedMilestone = await updateStatusMilestone(id, isCompleted);
  return updatedMilestone;
}

export async function Delete(id: string) {
  await deleteMilestone(id);
  return;
}
