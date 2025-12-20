"use client";

import { useState } from "react";
import { MockGoals } from "./MockData";
import { Goal, Milestone } from "@/types";
import { getThemeColors } from "@/types/theme";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Gift,
  Plus,
  Sparkles,
} from "lucide-react";
import CircularProgress from "./CircularProgress";

export default function MainContent() {
  const [goals, setGoals] = useState<Goal[]>(MockGoals);
  const [expandedGoalId, setExpandedGoalId] = useState<number | null>(null);

  const toggleGoal = (id: number) => {
    setExpandedGoalId(expandedGoalId === id ? null : id);
  };

  const toggleMilestone = (goalId: number, milestoneId: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id !== goalId) return goal;
        return {
          ...goal,
          milestones: goal.milestones.map((m) =>
            m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
          ),
        };
      })
    );
  };

  const calculateProgress = (milestones: Milestone[]) => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter((m) => m.isCompleted).length;
    return Math.round((completed / milestones.length) * 100);
  };

  return (
    <main className="px-4 pb-24 max-w-5xl mx-auto space-y-6">
      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.milestones);
          const colors = getThemeColors(goal.theme);
          const isExpanded = expandedGoalId === goal.id;
          const isFinished = progress === 100;

          return (
            <div
              key={goal.id}
              className={`
                  relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-4xl shadow-sm overflow-hidden transition-all duration-500
                  ${
                    isExpanded
                      ? "row-span-2 shadow-2xl ring-1 ring-stone-200"
                      : "hover:-translate-y-1 hover:shadow-lg"
                  }
                `}
            >
              {/* --- Card Header (Visible Always) --- */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleGoal(goal.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  {/* Category Tag */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}
                  >
                    {goal.category}
                  </span>
                  {/* Deadline Pill */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
                    <Calendar className="w-3 h-3" /> {goal.deadline}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Progress Circle Visual */}
                  <CircularProgress progress={progress} theme={goal.theme} />

                  <div className="flex-1">
                    <h3
                      className={`text-xl font-bold leading-tight mb-1 ${
                        isFinished
                          ? "line-through opacity-50"
                          : "text-stone-800"
                      }`}
                    >
                      {goal.title}
                    </h3>
                    {/* Reward Teaser (Motivator) */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mt-1">
                      <Gift className={`w-3 h-3 ${colors.accent}`} />
                      <span>
                        Reward:{" "}
                        <span className={`${colors.accent}`}>
                          {goal.reward}
                        </span>
                      </span>
                    </div>
                  </div>

                  <button className="p-2 bg-stone-50 rounded-full hover:bg-stone-100 text-stone-400 transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* --- Expanded Details (Milestones) --- */}
              {isExpanded && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-4 transition-all duration-300">
                  <div className="border-t border-dashed border-stone-200 my-2"></div>

                  {/* Motivation Box */}
                  <div
                    className={`mb-5 mt-4 p-4 rounded-xl ${colors.bg} border ${colors.border} relative overflow-hidden`}
                  >
                    <Sparkles
                      className={`absolute -right-2 -top-2 w-12 h-12 opacity-10 ${colors.text}`}
                    />
                    <p className="text-xs font-bold opacity-60 uppercase mb-1">
                      Why I do this?
                    </p>
                    <p className={`text-sm font-medium italic ${colors.text}`}>
                      &quot;{goal.motivation}&quot;
                    </p>
                  </div>

                  {/* Milestones List */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-stone-700">
                        Milestones Checklist
                      </span>
                      <span className="text-xs font-medium text-stone-400">
                        {goal.milestones.filter((m) => m.isCompleted).length}/
                        {goal.milestones.length} Selesai
                      </span>
                    </div>

                    {goal.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        onClick={() => toggleMilestone(goal.id, milestone.id)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group"
                      >
                        <div
                          className={`mt-0.5 transition-colors ${
                            milestone.isCompleted
                              ? colors.accent
                              : "text-stone-300 group-hover:text-stone-400"
                          }`}
                        >
                          {milestone.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium transition-all ${
                            milestone.isCompleted
                              ? "text-stone-400 line-through"
                              : "text-stone-700"
                          }`}
                        >
                          {milestone.title}
                        </span>
                      </div>
                    ))}

                    {/* Add Milestone Quick Input */}
                    <div className="flex items-center gap-3 p-2 pl-3 mt-2 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors border-t border-stone-100 pt-3">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-bold">
                        Tambah langkah kecil...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Bar Line at Bottom (Visual Touch) */}
              <div className="absolute bottom-0 left-0 h-1 bg-stone-100 w-full">
                <div
                  className={`h-full ${
                    colors.bg.replace("bg-", "bg-") === "bg-indigo-50"
                      ? "bg-indigo-500"
                      : colors.bg.replace("bg-", "bg-").replace("50", "500")
                  } transition-all duration-1000`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
