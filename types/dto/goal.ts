import { MilestoneResponse } from "./milestone";

export type GoalResponse = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: string;
  start: string;
  deadline: string;
  motivation?: string;
  reward?: string;
  theme?: string;
  milestones?: MilestoneResponse[];
  createdAt: Date;
  updatedAt?: Date;
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
  description?: string;
  category?: string;
  start?: string;
  deadline?: string;
  motivation?: string | null;
  reward?: string | null;
  theme?: string | null;
};
