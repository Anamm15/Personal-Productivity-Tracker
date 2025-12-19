import { useEffect, useState } from "react";

import { Clock } from "lucide-react";
import { agendaItems } from "./MockData";
import { timeStringToMinutes, timeToDate } from "@/utils/datetime";

export default function TimelineSection() {
  const [now, setNow] = useState<Date | null>(null);

  function getAgendaStatus(start: string, end: string, now: Date) {
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
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-xl font-bold text-stone-800">Alur Waktu</h2>
      </div>

      {/* Container Glassmorphism untuk Timeline */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-white/60 relative overflow-hidden">
        {/* Dekorasi garis subtle */}
        <div className="absolute left-18 top-0 bottom-0 w-0.5 bg-linear-to-b from-teal-100/20 via-stone-200/60 to-teal-100/20 hidden md:block"></div>

        <div className="space-y-8 relative z-10">
          {agendaItems.map((item, index) => {
            const status =
              now && getAgendaStatus(item.startTime, item.endTime, now);

            return (
              <div
                key={item.id}
                className="relative flex items-start gap-6 md:gap-8 group"
              >
                {/* Jam */}
                <div className="w-14 text-right pt-2 shrink-0 relative">
                  <span className="text-base font-bold text-stone-700 block">
                    {item.startTime}
                  </span>

                  {status === "ACTIVE" && (
                    <span className="absolute -right-3 top-3 w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Dot Connector & Line */}
                <div className="relative pt-3 flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full bg-stone-400 border-4 border-white shadow-md group-hover:bg-teal-500 group-hover:scale-110 transition-all z-10
                      ${status == "ACTIVE" ? "bg-teal-500" : ""}`}
                  ></div>
                  {index !== agendaItems.length - 1 && (
                    <div className="absolute top-7 -bottom-8 w-0.5 bg-stone-100 group-hover:bg-teal-100/50 transition-colors md:hidden"></div>
                  )}
                </div>

                {/* Card Content */}
                <div
                  className={`flex-1 bg-white/80 hover:bg-teal-50/40 p-5 rounded-3xl transition-all border border-stone-200/50 hover:border-teal-400/80 shadow-sm cursor-pointer group-hover:translate-x-1
                    ${
                      status === "ACTIVE"
                        ? "bg-teal-200 border-teal-400 border-2"
                        : status === "PAST"
                        ? "bg-stone-100 opacity-60"
                        : "bg-white"
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div>
                      <h4 className="font-bold text-lg text-stone-800">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-teal-500/70" />
                        <span className="text-sm text-stone-500 font-medium">
                          {timeStringToMinutes(item.endTime) -
                            timeStringToMinutes(item.startTime)}
                          {" minutes "}— Sampai {item.endTime}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm self-start md:self-auto ${item.color}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hiasan di bawah timeline */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white/60 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
