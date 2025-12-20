import api from "@/lib/api";
import { CreateGoalRequest, UpdateGoalRequest } from "@/types/dto/goal";
import { CreateMilestoneRequest } from "@/types/dto/milestone";

export const createGoal = async (goal: CreateGoalRequest) => {
  const response = await api.post("/goals", goal);
  return response.data;
};

export const getGoals = async () => {
  const response = await api.get("/goals");
  return response.data;
};

export const deleteGoal = async (id: string) => {
  const response = await api.delete(`/goals/${id}`);
  return response.data;
};

export const updateGoal = async (id: string, goal: UpdateGoalRequest) => {
  const response = await api.put(`/goals/${id}`, goal);
  return response.data;
};

export const addMilestone = async (
  id: string,
  milestone: CreateMilestoneRequest
) => {
  const response = await api.post(`/goals/${id}/milestones`, milestone);
  return response.data;
};

export const updateStatusMilestone = async (
  id: string,
  isCompleted: boolean
) => {
  const response = await api.put(`/milestones/${id}`, { isCompleted });
  return response.data;
};

export const deleteMilestone = async (id: string) => {
  const response = await api.delete(`/milestones/${id}`);
  return response.data;
};
