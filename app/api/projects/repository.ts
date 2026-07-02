import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { projects } from "@/database/schema/project";
import { AppError } from "@/lib/exceptions";
import { CreateProjectRequest, ProjectResponse, UpdateProjectRequest } from "@/types/dto/project";

export async function getUserProjectById(
  id: string,
  userId: string,
): Promise<ProjectResponse> {
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, userId)),
    with: {
      sprints: {
        with: {
          projectTasks: true,
        },
        orderBy: (sprints, { asc }) => [asc(sprints.createdAt)],
      },
    },
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }
  return project as ProjectResponse;
}

export async function getUserProjects(
  userId: string,
): Promise<ProjectResponse[]> {
  const projectsData = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
    with: {
      sprints: {
        with: {
          projectTasks: true,
        },
      },
    },
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });

  return projectsData as ProjectResponse[];
}

export async function insertProject(
  userId: string,
  project: CreateProjectRequest,
): Promise<ProjectResponse> {
  const insertedProject = await db
    .insert(projects)
    .values({
      ...project,
      userId,
    })
    .returning();
  if (!insertedProject || insertedProject.length === 0) {
    throw new AppError("Failed to insert project", 500);
  }
  return insertedProject[0] as ProjectResponse;
}

export async function updateProject(
  id: string,
  userId: string,
  project: UpdateProjectRequest,
): Promise<ProjectResponse> {
  const updatedProject = await db
    .update(projects)
    .set(project)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .returning();

  if (!updatedProject || updatedProject.length === 0) {
    throw new AppError("Failed to update project", 500);
  }
  return updatedProject[0] as ProjectResponse;
}

export async function deleteProject(id: string, userId: string) {
  const deletedProject = await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .returning();
  
  if (!deletedProject || deletedProject.length === 0) {
    throw new AppError("Failed to delete project", 500);
  }
  return deletedProject[0];
}
