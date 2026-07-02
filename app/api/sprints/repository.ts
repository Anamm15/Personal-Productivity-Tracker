import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { sprints } from "@/database/schema/sprint";
import { AppError } from "@/lib/exceptions";
import { CreateSprintRequest, SprintResponse, UpdateSprintRequest } from "@/types/dto/sprint";
import { projects } from "@/database/schema/project";

export async function insertSprint(
  userId: string, // Check project ownership
  sprint: CreateSprintRequest,
): Promise<SprintResponse> {
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, sprint.projectId), eq(projects.userId, userId))
  });
  if (!project) throw new AppError("Project not found", 404);

  const insertedSprint = await db
    .insert(sprints)
    .values(sprint)
    .returning();
  
  if (!insertedSprint || insertedSprint.length === 0) {
    throw new AppError("Failed to insert sprint", 500);
  }
  return insertedSprint[0] as SprintResponse;
}

export async function updateSprint(
  id: string,
  userId: string,
  sprint: UpdateSprintRequest,
): Promise<SprintResponse> {
  // Simplification: We should join with project to check userId, but we can also just fetch sprint with project first
  const sprintRecord = await db.query.sprints.findFirst({
    where: eq(sprints.id, id),
    with: { project: true }
  });
  
  if (!sprintRecord || sprintRecord.project.userId !== userId) {
    throw new AppError("Sprint not found", 404);
  }

  const updatedSprint = await db
    .update(sprints)
    .set(sprint)
    .where(eq(sprints.id, id))
    .returning();

  return updatedSprint[0] as SprintResponse;
}

export async function deleteSprint(id: string, userId: string) {
  const sprintRecord = await db.query.sprints.findFirst({
    where: eq(sprints.id, id),
    with: { project: true }
  });
  
  if (!sprintRecord || sprintRecord.project.userId !== userId) {
    throw new AppError("Sprint not found", 404);
  }

  const deletedSprint = await db
    .delete(sprints)
    .where(eq(sprints.id, id))
    .returning();
  
  return deletedSprint[0];
}
