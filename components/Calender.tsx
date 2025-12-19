import { DAYS, MONTHS } from "@/constants/date";
import { getDaysInMonth, isSameDate, isToday } from "@/utils/datetime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "./Modal";

type CalendarProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Calender({
  currentDate,
  setCurrentDate,
  setIsCalendarOpen,
}: CalendarProps) {
  return (
    <Modal title="Pilih Tanggal" setIsModalOpen={setIsCalendarOpen}>
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-stone-800">
            {MONTHS[currentDate.getMonth()]}
          </h2>
          <p className="text-stone-500 font-medium">
            {currentDate.getFullYear()}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
            className="p-2 rounded-full hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-stone-600" />
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
            className="p-2 rounded-full hover:bg-stone-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-4">
        {/* Day Names */}
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-xs font-bold text-stone-400 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}

        {/* Dates */}
        {getDaysInMonth(currentDate).map((d, idx) => {
          if (!d) return <div key={`empty-${idx}`}></div>; // Slot kosong

          const isSelected = isSameDate(d, currentDate);
          const isTodayDate = isToday(d);
          return (
            <button
              key={idx}
              onClick={() => {
                setCurrentDate(d);
                setIsCalendarOpen(false);
              }}
              className={`relative h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
               ${
                 isSelected
                   ? "bg-stone-900 text-white shadow-lg shadow-stone-900/30 scale-110"
                   : "text-stone-700 hover:bg-teal-50 hover:text-teal-600"
               }
               ${
                 isTodayDate && !isSelected
                   ? "text-teal-600 bg-teal-50 ring-1 ring-teal-200"
                   : ""
               }
               `}
            >
              {d.getDate()}
              {/* Dot Indikator di bawah tanggal jika ada event */}
              {d.getDate() % 2 === 0 && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-rose-400 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => {
          setCurrentDate(new Date());
          setIsCalendarOpen(false);
        }}
        className="w-full py-3 mt-2 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-xl transition-colors text-sm"
      >
        Kembali ke Hari Ini
      </button>
    </Modal>
  );
}
