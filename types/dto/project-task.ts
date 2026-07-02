export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type ProjectTaskResponse = {
  id: string;
  sprintId: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type CreateProjectTaskRequest = {
  sprintId: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
};

export type UpdateProjectTaskRequest = {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
};
