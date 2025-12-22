import { useEffect, useState } from "react";
import { Clock, Coffee } from "lucide-react";
import { timeStringToMinutes, timeToDate } from "@/utils/datetime";
import { TaskResponse } from "@/types/dto/task";
import { getTagColor, StatusBadge } from "@/helpers/themes";

export default function TimelineSection({
  setSelectedTask,
  setIsModalOpen,
  tasks,
}: {
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskResponse | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: TaskResponse[] | null | undefined;
}) {
  const [now, setNow] = useState<Date | null>(null);

  // Helper check
  const hasTasks = tasks && tasks.length > 0;

  function getTimeStatus(start: string, end: string, now: Date) {
    const startDate = timeToDate(start);
    const endDate = timeToDate(end);

    if (now >= startDate && now <= endDate) return "ACTIVE";
    if (now > endDate) return "PAST";
    return "UPCOMING";
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-bold text-stone-800">Timeline</h2>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-4xl p-4 md:p-8 shadow-sm border border-white/60 relative overflow-hidden min-h-75">
        {/* Vertical Line Decoration (Desktop only) - Hide if empty */}
        {hasTasks && (
          <div className="absolute left-18 top-0 bottom-0 w-0.5 bg-linear-to-b from-teal-50 via-stone-200 to-teal-50 hidden md:block"></div>
        )}

        {!hasTasks ? (
          // --- EMPTY STATE ---
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="bg-stone-50 border border-stone-100 p-4 rounded-full mb-4 shadow-sm">
              <Coffee className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-stone-700 font-bold text-lg mb-1">
              No Schedule yet
            </h3>
            <p className="text-stone-500 text-sm max-w-xs mx-auto leading-relaxed">
              Your schedule is empty for today. Enjoy your free time or assign
              new tasks.
            </p>
          </div>
        ) : (
          // --- TASK LIST ---
          <div className="space-y-6 relative z-10">
            {tasks.map((item, index) => {
              const timeStatus =
                now && getTimeStatus(item.startTime, item.endTime, now);
              const duration =
                timeStringToMinutes(item.endTime) -
                timeStringToMinutes(item.startTime);

              return (
                <div
                  key={item.id}
                  className="relative flex items-start gap-4 md:gap-8 group"
                >
                  {/* 1. Time Column */}
                  <div className="w-12 md:w-14 text-right pt-3 shrink-0 relative">
                    <span
                      className={`text-sm md:text-base font-bold block ${
                        timeStatus === "ACTIVE"
                          ? "text-teal-600"
                          : "text-stone-500"
                      }`}
                    >
                      {item.startTime}
                    </span>

                    {/* Mobile Line Connector */}
                    {index !== (tasks.length || 0) - 1 && (
                      <div className="absolute right-5 top-8 bottom-6 w-0.5 bg-stone-100 md:hidden"></div>
                    )}
                  </div>

                  {/* 2. Dot Connector */}
                  <div className="relative pt-4 flex flex-col items-center">
                    <div
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-[3px] shadow-sm z-10 transition-all duration-300
                      ${
                        timeStatus === "ACTIVE"
                          ? "bg-teal-500 border-teal-100 scale-125 ring-2 ring-teal-200"
                          : "bg-white border-stone-300 group-hover:border-teal-400"
                      }`}
                    ></div>

                    {timeStatus === "ACTIVE" && (
                      <span className="absolute top-4 w-3.5 h-3.5 bg-teal-400 rounded-full animate-ping opacity-75" />
                    )}
                  </div>

                  {/* 3. Card Content */}
                  <div
                    onClick={() => {
                      setSelectedTask(item);
                      setIsModalOpen(true);
                    }}
                    className={`flex-1 rounded-2xl p-4 md:p-5 transition-all duration-300 cursor-pointer border shadow-sm group-hover:-translate-y-0.5
                    ${
                      timeStatus === "ACTIVE"
                        ? "bg-teal-50/80 border-teal-200 ring-1 ring-teal-100 shadow-teal-100/50"
                        : timeStatus === "PAST"
                        ? "bg-stone-50/50 border-stone-100 opacity-70 grayscale-[0.5]"
                        : "bg-white border-stone-200/60 hover:border-teal-300/50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h4
                        className={`font-bold text-base md:text-lg leading-tight ${
                          timeStatus === "PAST"
                            ? "text-stone-500"
                            : "text-stone-800"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <div className="shrink-0">
                        <StatusBadge status={item.status} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-xs md:text-sm text-stone-500 font-medium">
                        {duration} min{" "}
                        <span className="text-stone-300 mx-1">|</span> To{" "}
                        {item.endTime}
                      </span>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap items-center">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border border-transparent hover:border-black/5 transition-all ${getTagColor(
                              tag,
                              "soft"
                            )}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Fade Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/40 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
