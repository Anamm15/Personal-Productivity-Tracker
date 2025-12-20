import { END_HOUR, HOUR_HEIGHT, START_HOUR } from "@/constants/date";
import { Task } from "@/types";
import { timeStringToMinutes } from "@/utils/datetime";
import React, { useEffect, useState } from "react";

type MainTimelineContentProps = {
  tasks: Task[];
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setIsTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainTimelineContent({
  tasks,
  setSelectedTask,
  setIsTaskModalOpen,
}: MainTimelineContentProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    // Update every 1 minutes
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateTop = (startTime: string) => {
    const startMinutes = timeStringToMinutes(startTime);
    const offsetMinutes = startMinutes - START_HOUR * 60;
    return (offsetMinutes / 60) * HOUR_HEIGHT;
  };

  const calculateHeight = (startTime: string, endTime: string) => {
    const start = timeStringToMinutes(startTime);
    const end = timeStringToMinutes(endTime);
    return ((end - start) / 60) * HOUR_HEIGHT;
  };

  const calculateNowPosition = (date: Date) => {
    const currentMinutes = date.getHours() * 60 + date.getMinutes();
    const startDayMinutes = START_HOUR * 60;
    const offset = currentMinutes - startDayMinutes;

    if (offset < 0) return -10;

    return (offset / 60) * HOUR_HEIGHT;
  };

  return (
    <main className="max-w-4xl mx-auto px-2 py-6 pb-24 relative">
      <div className="relative bg-white/60 backdrop-blur-lg rounded-[2.5rem] border border-white/60 shadow-sm overflow-hidden min-h-[80vh]">
        {/* Grid Lines */}
        {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => {
          const hour = START_HOUR + i;
          return (
            <div
              key={hour}
              className="flex border-b border-stone-100 group"
              style={{ height: `${HOUR_HEIGHT}px` }}
            >
              <div className="w-16 sm:w-20 border-r border-stone-100 text-xs font-bold text-stone-400 p-3 text-right bg-stone-50/30">
                {hour.toString().padStart(2, "0")}:00
              </div>
              <div
                className="flex-1 relative cursor-pointer hover:bg-teal-50/30 transition-colors"
                onClick={() => {
                  setSelectedTask(null);
                  setIsTaskModalOpen(true);
                }}
              >
                <div className="absolute top-1/2 w-full border-t border-dashed border-stone-100 pointer-events-none"></div>
              </div>
            </div>
          );
        })}

        {/* Tasks Rendering */}
        {tasks.map((task) => {
          const top = calculateTop(task.startTime);
          const height = calculateHeight(task.startTime, task.endTime);
          return (
            <div
              key={task.id}
              className={`absolute left-16 sm:left-20 right-2 sm:right-4 rounded-2xl border p-3 flex flex-col justify-center cursor-pointer hover:scale-[1.01] hover:shadow-md transition-all z-10 ${task.color}`}
              style={{ top: `${top}px`, height: `${height - 4}px` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTask(task);
                setIsTaskModalOpen(true);
              }}
            >
              <div className="flex justify-between">
                <span className="text-xs font-bold opacity-70">
                  {task.startTime} - {task.endTime}
                </span>
              </div>
              <h3 className="font-bold text-sm leading-tight line-clamp-2">
                {task.title}
              </h3>
            </div>
          );
        })}

        {/* --- Now Indicator Rendering --- */}
        {now && (
          <div
            className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
            style={{
              top: `${calculateNowPosition(now)}px`,
              display:
                now.getHours() < START_HOUR || now.getHours() > END_HOUR
                  ? "none"
                  : "flex",
            }}
          >
            {/* Time Label */}
            <div className="w-16 sm:w-20 pr-2 text-right">
              <span className="inline-block bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                {now.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Indicator */}
            <div className="flex-1 relative flex items-center">
              {/* Dot */}
              <div className="absolute -left-1.25 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm z-30"></div>

              {/* Line */}
              <div className="w-full h-0.5 bg-rose-500 shadow-[0_0_4px_rgba(244,63,94,0.4)]"></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
