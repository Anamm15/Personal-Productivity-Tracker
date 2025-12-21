import { useState, useEffect, useRef } from "react";
import {
  Rocket,
  Trophy,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MONTHS } from "@/constants/date";

type HeaderProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  currentDate: Date;
};

export default function Header({
  setIsModalOpen,
  setCurrentDate,
  currentDate,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewYear, setViewYear] = useState(currentDate.getFullYear());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDropdownOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setViewYear(currentDate.getFullYear());
    }
  }, [isDropdownOpen, currentDate]);

  // Handle Click Outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleYearChange = (increment: number) => {
    setViewYear((prev) => prev + increment);
  };

  const handleSelectMonth = (monthIndex: number) => {
    const newDate = new Date(viewYear, monthIndex, 1);
    setCurrentDate(newDate);
    setIsDropdownOpen(false);
  };

  const formattedCurrentDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <header className="px-6 py-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black text-stone-900 flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-xl rotate-3 transition-transform hover:rotate-6">
              <Trophy className="w-8 h-8 text-amber-600 fill-amber-600/20" />
            </div>
            Goals & Vision
          </h1>

          <div className="flex items-center gap-3 text-stone-500 font-medium relative z-20">
            <span>Filtering for:</span>

            {/* Dropdown Area */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200
                  ${
                    isDropdownOpen
                      ? "bg-stone-900 text-white border-stone-900 shadow-lg scale-105"
                      : "bg-white text-stone-700 border-stone-200 hover:border-amber-400 hover:text-stone-900 shadow-sm"
                  }
                `}
              >
                <Calendar className="w-4 h-4" />
                <span className="font-bold min-w-35 text-left">
                  {formattedCurrentDate}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-100 p-4 animate-in fade-in zoom-in-95 duration-200 origin-top-left z-50">
                  {/* Year Navigator */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                    <button
                      onClick={() => handleYearChange(-1)}
                      className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-lg text-stone-800">
                      {viewYear}
                    </span>
                    <button
                      onClick={() => handleYearChange(1)}
                      className="p-1 hover:bg-stone-100 rounded-lg text-stone-500 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Month Grid (3 Kolom) */}
                  <div className="grid grid-cols-3 gap-2">
                    {MONTHS.map((month, index) => {
                      // Cek apakah bulan ini adalah yang sedang dipilih (mempertimbangkan tahun juga)
                      const isSelected =
                        currentDate.getMonth() === index &&
                        currentDate.getFullYear() === viewYear;

                      return (
                        <button
                          key={month}
                          onClick={() => handleSelectMonth(index)}
                          className={`
                            px-2 py-2 rounded-lg text-xs font-bold transition-all
                            ${
                              isSelected
                                ? "bg-stone-900 text-white shadow-md scale-105"
                                : "bg-stone-50 text-stone-600 hover:bg-amber-100 hover:text-amber-700"
                            }
                          `}
                        >
                          {month.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-2xl font-bold shadow-xl shadow-stone-900/10 hover:shadow-stone-900/20 hover:-translate-y-1 active:scale-95 transition-all duration-300"
        >
          <Rocket className="w-5 h-5 group-hover:animate-pulse" />
          <span>Set New Goal</span>
        </button>
      </div>
    </header>
  );
}
