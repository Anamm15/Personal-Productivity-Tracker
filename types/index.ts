export type Task = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  tag: string;
  color: string;
  description?: string;
};

export type Milestone = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type Goal = {
  id: number;
  title: string;
  category: string;
  deadline: string;
  motivation: string;
  reward: string;
  milestones: Milestone[];
  theme: "indigo" | "emerald" | "rose" | "amber";
};
