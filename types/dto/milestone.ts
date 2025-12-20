export type MilestoneResponse = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type CreateMilestoneRequest = {
  title: string;
};
