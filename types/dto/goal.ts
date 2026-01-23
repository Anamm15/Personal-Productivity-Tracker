import { MilestoneResponse } from "./milestone";

export type GoalResponse = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  category: string;
  start: string;
  deadline: string;
  motivation?: string | null;
  reward?: string | null;
  theme?: string | null;
  milestones?: MilestoneResponse[] | null;
  createdAt: Date;
  updatedAt?: Date | null;
};

export type CreateGoalRequest = {
  title: string;
  description?: string;
  category: string;
  start: string;
  deadline: string;
  motivation?: string;
  reward?: string;
  theme?: string;
};

export type UpdateGoalRequest = {
  title?: string;
  description?: string | null;
  category?: string;
  start?: string;
  deadline?: string;
  motivation?: string | null;
  reward?: string | null;
  theme?: string | null;
};
