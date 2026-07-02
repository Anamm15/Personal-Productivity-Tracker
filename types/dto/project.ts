import { SprintResponse } from "./sprint";

export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export type ProjectResponse = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  color?: string | null;
  status: ProjectStatus;
  sprints?: SprintResponse[] | null;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type CreateProjectRequest = {
  title: string;
  description?: string;
  color?: string;
};

export type UpdateProjectRequest = {
  title?: string;
  description?: string | null;
  color?: string | null;
  status?: ProjectStatus;
};
