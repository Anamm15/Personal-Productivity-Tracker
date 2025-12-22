"use client";

import { useState } from "react";
import { getThemeColors } from "@/types/theme";
import { Calendar, ChevronDown, ChevronUp, Gift, Target } from "lucide-react"; // Tambahkan Target icon
import CircularProgress from "./CircularProgress";
import { GoalResponse } from "@/types/dto/goal";
import { MilestoneResponse } from "@/types/dto/milestone";
import ExpandedDetails from "./ExpandedDetails";

const GoalSkeleton = () => (
  <div className="bg-white h-48 rounded-4xl animate-pulse border border-white/80"></div>
);

type MainContentProps = {
  goals?: GoalResponse[] | null;
  setGoals: React.Dispatch<
    React.SetStateAction<GoalResponse[] | null | undefined>
  >;
  isLoading: boolean;
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedGoal: React.Dispatch<React.SetStateAction<GoalResponse | null>>;
};

export default function MainContent({
  goals,
  setGoals,
  isLoading,
  setIsUpdateModalOpen,
  setSelectedGoal,
}: MainContentProps) {
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);
  const [addingMilestoneGoalId, setAddingMilestoneGoalId] = useState<
    string | null
  >(null);

  const handleToggleGoal = (id: string) => {
    setExpandedGoalId(expandedGoalId === id ? null : id);
    const goal = goals?.find((g) => g.id === id);
    if (goal) {
      setSelectedGoal(goal);
    }
  };

  const calculateProgress = (milestones: MilestoneResponse[] = []) => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter((m) => m.isCompleted).length;
    return Math.round((completed / milestones.length) * 100);
  };

  const getProgressBarColor = (bgClass: string) => {
    return bgClass.replace("50", "500");
  };

  // --- 1. HANDLING LOADING ---
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

  // --- 2. HANDLING EMPTY STATE (Data Kosong) ---
  if (!goals || goals.length === 0) {
    return (
      <main className="px-4 pb-24 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-stone-200 rounded-4xl">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Target className="w-10 h-10 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-stone-700 mb-2">
            No Goals yet
          </h3>
          <p className="text-stone-500 max-w-md">
            Start your journey by setting your first goal. Break it down into
            smaller milestones to make it more achievable.
          </p>
        </div>
      </main>
    );
  }

  // --- 3. RENDER DATA (Jika ada) ---
  return (
    <main className="px-4 pb-24 max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal: GoalResponse) => {
          const milestones = goal.milestones || [];
          const progress = calculateProgress(milestones);
          const colors = getThemeColors(goal.theme || "indigo");
          const isExpanded = expandedGoalId === goal.id;
          const isFinished = progress === 100;

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
                <ExpandedDetails
                  goal={goal}
                  setGoals={setGoals}
                  milestones={milestones}
                  colors={colors}
                  isAddingThisGoal={isAddingThisGoal}
                  setAddingMilestoneGoalId={setAddingMilestoneGoalId}
                  setIsUpdateModalOpen={setIsUpdateModalOpen}
                />
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
