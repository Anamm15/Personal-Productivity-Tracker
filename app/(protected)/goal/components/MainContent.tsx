"use client";

import { useState } from "react";
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
  X, // Import icon X untuk cancel
} from "lucide-react";
import CircularProgress from "./CircularProgress";
import {
  useAddMilestone,
  useGoalsQuery,
  useUpdateStatusMilestone,
} from "../hooks/useGoal";
import { GoalResponse } from "@/types/dto/goal";
import { MilestoneResponse } from "@/types/dto/milestone";

// Opsional: Skeleton Loader Component
const GoalSkeleton = () => (
  <div className="bg-white/50 h-48 rounded-4xl animate-pulse border border-white/60"></div>
);

export default function MainContent() {
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

  // State baru untuk input milestone
  const [addingMilestoneGoalId, setAddingMilestoneGoalId] = useState<
    string | null
  >(null);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");

  const { data: goals, isLoading } = useGoalsQuery();
  const { mutate: addMilestone } = useAddMilestone();
  const { mutate: updateStatusMilestone } = useUpdateStatusMilestone();

  const handleToggleGoal = (id: string) => {
    setExpandedGoalId(expandedGoalId === id ? null : id);
  };

  const handleToggleMilestone = (
    goalId: string,
    milestone: MilestoneResponse
  ) => {
    updateStatusMilestone({
      id: milestone.id,
      isCompleted: !milestone.isCompleted,
    });
  };

  // --- Logic Baru: Handle Tambah Milestone ---
  const startAdding = (goalId: string) => {
    setAddingMilestoneGoalId(goalId);
    setNewMilestoneTitle("");
  };

  const cancelAdding = () => {
    setAddingMilestoneGoalId(null);
    setNewMilestoneTitle("");
  };

  const submitMilestone = (goalId: string) => {
    if (!newMilestoneTitle.trim()) {
      cancelAdding();
      return;
    }

    addMilestone({ id: goalId, title: newMilestoneTitle });
  };

  const handleKeyDown = (e: React.KeyboardEvent, goalId: string) => {
    if (e.key === "Enter") {
      submitMilestone(goalId);
    } else if (e.key === "Escape") {
      cancelAdding();
    }
  };
  // ------------------------------------------

  const calculateProgress = (milestones: MilestoneResponse[] = []) => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter((m) => m.isCompleted).length;
    return Math.round((completed / milestones.length) * 100);
  };

  const getProgressBarColor = (bgClass: string) => {
    return bgClass.replace("50", "500");
  };

  if (isLoading) {
    return (
      <main className="px-4 pb-24 max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GoalSkeleton />
          <GoalSkeleton />
          <GoalSkeleton />
          <GoalSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 pb-24 max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals &&
          goals.map((goal: GoalResponse) => {
            const milestones = goal.milestones || [];
            const progress = calculateProgress(milestones);
            const colors = getThemeColors(goal.theme || "indigo");
            const isExpanded = expandedGoalId === goal.id;
            const isFinished = progress === 100;

            // Cek apakah goal ini sedang dalam mode "Tambah Milestone"
            const isAddingThisGoal = addingMilestoneGoalId === goal.id;

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
                {/* --- Card Header --- */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => handleToggleGoal(goal.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}
                    >
                      {goal.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
                      <Calendar className="w-3 h-3" />
                      {new Date(goal.deadline).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <CircularProgress
                      progress={progress}
                      theme={goal.theme || "indigo"}
                    />

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
                      {goal.reward && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mt-1">
                          <Gift className={`w-3 h-3 ${colors.accent}`} />
                          <span>
                            Reward:{" "}
                            <span className={`${colors.accent}`}>
                              {goal.reward}
                            </span>
                          </span>
                        </div>
                      )}
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

                {/* --- Expanded Details --- */}
                {isExpanded && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-4 transition-all duration-300">
                    <div className="border-t border-dashed border-stone-200 my-2"></div>

                    {goal.motivation && (
                      <div
                        className={`mb-5 mt-4 p-4 rounded-xl ${colors.bg} border ${colors.border} relative overflow-hidden`}
                      >
                        <Sparkles
                          className={`absolute -right-2 -top-2 w-12 h-12 opacity-10 ${colors.text}`}
                        />
                        <p className="text-xs font-bold opacity-60 uppercase mb-1">
                          Why I do this?
                        </p>
                        <p
                          className={`text-sm font-medium italic ${colors.text}`}
                        >
                          &quot;{goal.motivation}&quot;
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-stone-700">
                          Milestones Checklist
                        </span>
                        <span className="text-xs font-medium text-stone-400">
                          {milestones.filter((m) => m.isCompleted).length}/
                          {milestones.length} Selesai
                        </span>
                      </div>

                      {milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleMilestone(goal.id, milestone);
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group"
                        >
                          <div
                            className={`transition-colors ${
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
                          <div
                            className={`text-sm font-medium transition-all ${
                              milestone.isCompleted
                                ? "text-stone-400 line-through"
                                : "text-stone-700"
                            }`}
                          >
                            {milestone.title}
                          </div>
                        </div>
                      ))}

                      {/* --- AREA EDITABLE UNTUK TAMBAH MILESTONE --- */}
                      {isAddingThisGoal ? (
                        <div className="flex items-center gap-3 p-2 pl-3 mt-2 bg-white border border-stone-200 rounded-xl shadow-sm animate-in fade-in zoom-in-95 duration-200">
                          <Circle className="w-5 h-5 text-stone-300 flex-shrink-0" />
                          <input
                            autoFocus
                            type="text"
                            value={newMilestoneTitle}
                            onChange={(e) =>
                              setNewMilestoneTitle(e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, goal.id)}
                            placeholder="Tulis langkah kecil..."
                            className="flex-1 text-sm font-medium text-stone-700 placeholder:text-stone-300 outline-none bg-transparent"
                          />
                          <div className="flex items-center gap-1">
                            <button
                              onClick={cancelAdding}
                              className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-rose-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => submitMilestone(goal.id)}
                              className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-indigo-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => startAdding(goal.id)}
                          className="flex items-center gap-3 p-2 pl-3 mt-2 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors border-t border-stone-100 pt-3 group/add"
                        >
                          <Plus className="w-4 h-4 group-hover/add:scale-110 transition-transform" />
                          <span className="text-sm font-bold">
                            Tambah langkah kecil...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 h-1.5 bg-stone-100 w-full">
                  <div
                    className={`h-full ${getProgressBarColor(
                      colors.bg
                    )} transition-all duration-1000 ease-out`}
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
