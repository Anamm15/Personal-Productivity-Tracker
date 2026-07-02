import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { projectTasks } from "@/database/schema/project-task";
import { AppError } from "@/lib/exceptions";
import { CreateProjectTaskRequest, ProjectTaskResponse, UpdateProjectTaskRequest } from "@/types/dto/project-task";
import { sprints } from "@/database/schema/sprint";
import { projects } from "@/database/schema/project";

// Utility to verify user has access to sprint
async function verifySprintAccess(sprintId: string, userId: string) {
  const sprint = await db.query.sprints.findFirst({
    where: eq(sprints.id, sprintId),
    with: { project: true }
  });
  if (!sprint || sprint.project.userId !== userId) {
    throw new AppError("Sprint not found or unauthorized", 404);
  }
}

export async function insertProjectTask(
  userId: string,
  task: CreateProjectTaskRequest,
): Promise<ProjectTaskResponse> {
  await verifySprintAccess(task.sprintId, userId);

  const insertedTask = await db
    .insert(projectTasks)
    .values(task)
    .returning();
  
  if (!insertedTask || insertedTask.length === 0) {
    throw new AppError("Failed to insert project task", 500);
  }
  return insertedTask[0] as ProjectTaskResponse;
}

export async function updateProjectTask(
  id: string,
  userId: string,
  task: UpdateProjectTaskRequest,
): Promise<ProjectTaskResponse> {
  // Verify access by joining up to project
  const taskRecord = await db.query.projectTasks.findFirst({
    where: eq(projectTasks.id, id),
    with: {
      sprint: {
        with: { project: true }
      }
    }
  });
  
  if (!taskRecord || taskRecord.sprint.project.userId !== userId) {
    throw new AppError("Task not found", 404);
  }

  const updatedTask = await db
    .update(projectTasks)
    .set(task)
    .where(eq(projectTasks.id, id))
    .returning();

  return updatedTask[0] as ProjectTaskResponse;
}

export async function deleteProjectTask(id: string, userId: string) {
  const taskRecord = await db.query.projectTasks.findFirst({
    where: eq(projectTasks.id, id),
    with: {
      sprint: {
        with: { project: true }
      }
    }
  });
  
  if (!taskRecord || taskRecord.sprint.project.userId !== userId) {
    throw new AppError("Task not found", 404);
  }

  const deletedTask = await db
    .delete(projectTasks)
    .where(eq(projectTasks.id, id))
    .returning();
  
  return deletedTask[0];
}
