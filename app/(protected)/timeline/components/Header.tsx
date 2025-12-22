import { DAYS, MONTHS } from "@/constants/date";
import { getWeekDays, isSameDate, isToday } from "@/utils/datetime";
import { CalendarDays, ChevronDown, Plus } from "lucide-react";

type HeaderProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({
  currentDate,
  setCurrentDate,
  setIsCalendarOpen,
  setIsTaskModalOpen,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/50 pt-4 pb-2 px-4 shadow-sm transition-all">
      <div className="max-w-4xl mx-auto">
        {/* Top Row: Navigation & Title */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="group flex items-center gap-3 px-2 py-1 -ml-2 rounded-xl hover:bg-stone-100/80 transition-all cursor-pointer"
          >
            <div className="p-2 bg-stone-900 text-white rounded-lg shadow-lg group-hover:scale-105 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-stone-800 transition-colors" />
              </h1>
              <p className="text-xs text-stone-500 font-medium">
                {isToday(currentDate) ? "Today" : "Chosen Date"}
              </p>
            </div>
          </button>

          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="p-3 bg-linear-to-tr from-stone-800 to-stone-900 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Row: Horizontal Date Strip (Week Scroller) */}
        <div className="flex justify-between items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {getWeekDays(currentDate).map((date, idx) => {
            const active = isSameDate(date, currentDate);
            const today = isToday(date);

            return (
              <button
                key={idx}
                onClick={() => setCurrentDate(date)}
                className={`
                    flex flex-col items-center justify-center min-w-14 py-3 rounded-2xl border transition-all duration-300 relative overflow-hidden
                    ${
                      active
                        ? "bg-stone-900 text-white border-stone-900 shadow-lg scale-105 z-10"
                        : "bg-white border-stone-100 text-stone-400 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600"
                    }
                  `}
              >
                {/* Dot Indicator "Today" */}
                {today && (
                  <span
                    className={`absolute top-2 w-1.5 h-1.5 rounded-full ${
                      active ? "bg-teal-400" : "bg-teal-500"
                    }`}
                  ></span>
                )}

                <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5">
                  {DAYS[date.getDay()]}
                </span>
                <span
                  className={`text-xl font-bold ${
                    active ? "text-white" : "text-stone-700"
                  }`}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
