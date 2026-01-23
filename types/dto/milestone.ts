export type MilestoneResponse = {
  id: string;
  title: string;
  isCompleted: boolean | null;
  createdAt?: Date;
};

export type CreateMilestoneRequest = {
  title: string;
};
