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
  isPriority: boolean;
  tagPriority: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export type TaskCreateRequest = {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  color?: string;
  tags?: string[];
  reminder?: string;
  isPriority?: boolean;
  tagPriority?: string;
};

export type TaskUpdateRequest = {
  title?: string;
  description?: string | null;
  startTime?: string;
  endTime?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
  reminder?: string | null;
  tags?: string[] | null;
  isPriority?: boolean;
  tagPriority?: string | null;
};
