import React from "react";
import { ArrowUpRight, Sparkles, Calendar } from "lucide-react";
import { TaskResponse } from "@/types/dto/task";
import { CARD_THEMES } from "@/helpers/themes";

type MainFocusSectionProps = {
  priorityTasks: TaskResponse[] | null | undefined;
};

export default function MainFocusSection({
  priorityTasks,
}: MainFocusSectionProps) {
  const hasTasks = priorityTasks && priorityTasks.length > 0;

  return (
    <section>
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Primary Focus Today
        </h2>
      </div>

      {!hasTasks ? (
        <div className="p-8 rounded-4xl bg-stone-50 border-2 border-dashed border-stone-200 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-stone-600 font-bold">No Priority Task yet</h3>
            <p className="text-stone-400 text-sm">
              Schedule a task to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {priorityTasks.map((task, idx) => {
            const theme = CARD_THEMES[idx % CARD_THEMES.length];

            return (
              <div
                key={task.id}
                className={`group relative p-6 rounded-4xl bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ${theme.shadow} transition-all duration-300 cursor-pointer hover:-translate-y-1`}
              >
                {/* Background Accent */}
                <div
                  className={`absolute inset-0 rounded-4xl ${theme.accentBg} -z-10`}
                ></div>

                {/* Header: Icon & Number */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`p-3 rounded-2xl bg-white/90 shadow-sm ${theme.accentText}`}
                  >
                    {React.cloneElement(theme.icon, { className: "w-6 h-6" })}
                  </div>
                  <div className="text-4xl font-black text-stone-400/40 group-hover:text-stone-400/80 transition-colors select-none font-serif italic">
                    0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-stone-800 text-lg leading-tight mb-1 pr-4 line-clamp-2 min-h-12">
                  {task.title}
                </h3>

                <p className="text-sm text-stone-500 font-medium">
                  {task.tagPriority || theme.defaultSubtitle}
                </p>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className={`w-5 h-5 ${theme.accentText}`} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
