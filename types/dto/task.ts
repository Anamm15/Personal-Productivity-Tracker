export type TaskResponse = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  date: string;
  tags: string[] | null;
  color: string | null;
  reminder: string | null;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
  createdAt: Date;
  updatedAt: Date | null;
};

export type TaskCreateRequest = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  color?: string;
  tags?: string[];
  reminder?: string;
};

export type TaskUpdateRequest = {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
};
