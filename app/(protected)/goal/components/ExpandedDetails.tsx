import { GoalResponse } from "@/types/dto/goal";
import { MilestoneResponse } from "@/types/dto/milestone";
import { Theme } from "@/types/theme";
import {
  CheckCircle2,
  Circle,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  useAddMilestone,
  useDeleteMilestone,
  useUpdateStatusMilestone,
  useDeleteGoal,
} from "../hooks/useGoal";
import { useState } from "react";
import Button from "@/components/Button";

type ExpandedDetailsProps = {
  goal: GoalResponse;
  setGoals: React.Dispatch<
    React.SetStateAction<GoalResponse[] | null | undefined>
  >;
  milestones: MilestoneResponse[];
  colors: Theme;
  isAddingThisGoal: boolean;
  setAddingMilestoneGoalId: (id: string | null) => void;
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ExpandedDetails({
  goal,
  setGoals,
  milestones,
  colors,
  isAddingThisGoal,
  setAddingMilestoneGoalId,
  setIsUpdateModalOpen,
}: ExpandedDetailsProps) {
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const { mutateAsync: addMilestone } = useAddMilestone();
  const { mutateAsync: updateStatusMilestone } = useUpdateStatusMilestone();
  const { mutateAsync: deleteMilestone } = useDeleteMilestone();
  const { mutate: deleteGoal } = useDeleteGoal();

  const startAdding = (goalId: string) => {
    setAddingMilestoneGoalId(goalId);
    setNewMilestoneTitle("");
  };

  const cancelAdding = () => {
    setAddingMilestoneGoalId(null);
    setNewMilestoneTitle("");
  };

  const submitMilestone = async (goalId: string) => {
    if (!newMilestoneTitle.trim()) {
      cancelAdding();
      return;
    }

    await addMilestone({ id: goalId, title: newMilestoneTitle }).then(
      (data) => {
        setGoals((prevGoals) => {
          if (prevGoals) {
            const updatedGoals = prevGoals.map((g) => {
              if (g.id === goalId) {
                return {
                  ...g,
                  milestones: [...(g.milestones || []), data],
                };
              }
              return g;
            });
            return updatedGoals;
          }
          return prevGoals;
        });
        cancelAdding();
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, goalId: string) => {
    if (e.key === "Enter") {
      submitMilestone(goalId);
    } else if (e.key === "Escape") {
      cancelAdding();
    }
  };

  const handleToggleMilestone = async (
    goalId: string,
    milestone: MilestoneResponse
  ) => {
    await updateStatusMilestone({
      id: milestone.id,
      isCompleted: !milestone.isCompleted,
    }).then(() => {
      setGoals((prevGoals) => {
        if (prevGoals) {
          const updatedGoals = prevGoals.map((g) => {
            if (g.id === goalId) {
              return {
                ...g,
                milestones: g.milestones?.map((m) => {
                  if (m.id === milestone.id) {
                    return {
                      ...m,
                      isCompleted: !m.isCompleted,
                    };
                  }
                  return m;
                }),
              };
            }
            return g;
          });
          return updatedGoals;
        }
        return prevGoals;
      });
    });
  };

  const handleDeleteGoal = () => {
    if (window.confirm("Apakah kamu yakin ingin menghapus goal ini?")) {
      deleteGoal(goal.id);
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus milestone ini?")) {
      await deleteMilestone(milestoneId).then(() => {
        setGoals((prevGoals) => {
          if (prevGoals) {
            const updatedGoals = prevGoals.map((g) => {
              if (g.id === goal.id) {
                return {
                  ...g,
                  milestones: g.milestones?.filter((m) => m.id !== milestoneId),
                };
              }
              return g;
            });
            return updatedGoals;
          }
          return prevGoals;
        });
      });
    }
  };

  return (
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
          <p className={`text-sm font-medium italic ${colors.text}`}>
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
            {milestones.filter((m) => m.isCompleted).length}/{milestones.length}{" "}
            Selesai
          </span>
        </div>

        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMilestone(goal.id, milestone);
            }}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer group"
          >
            <div className="flex justify-center gap-3">
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
            <Trash2
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteMilestone(milestone.id);
              }}
              className="text-red-600 w-5 h-5 hover:fill-red-600 transition-colors"
            />
          </div>
        ))}

        {/* --- AREA EDITABLE UNTUK TAMBAH MILESTONE --- */}
        {isAddingThisGoal ? (
          <div className="flex items-center gap-3 p-2 pl-3 mt-2 bg-white border border-stone-200 rounded-xl shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <Circle className="w-5 h-5 text-stone-300 shrink-0" />
            <input
              autoFocus
              type="text"
              value={newMilestoneTitle}
              onChange={(e) => setNewMilestoneTitle(e.target.value)}
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
            <span className="text-sm font-bold">Tambah langkah kecil...</span>
          </div>
        )}
        <div className="mt-4 flex items-center gap-2">
          <Button
            color="bg-indigo-500"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              e.stopPropagation();
              setIsUpdateModalOpen(true);
            }}
            icon={Pencil}
            className="text-white w-1/2 hover:bg-indigo-800 transition-colors duration-300"
          >
            Update
          </Button>
          <Button
            color="bg-rose-500"
            onClick={handleDeleteGoal}
            icon={Trash2}
            className="text-white w-1/2 hover:bg-rose-800 transition-colors duration-300"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
