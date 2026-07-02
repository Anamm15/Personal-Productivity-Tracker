import { ProjectTaskResponse } from "./project-task";

export type SprintStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export type SprintResponse = {
  id: string;
  projectId: string;
  title: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status: SprintStatus;
  projectTasks?: ProjectTaskResponse[] | null;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type CreateSprintRequest = {
  projectId: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

export type UpdateSprintRequest = {
  title?: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status?: SprintStatus;
};
