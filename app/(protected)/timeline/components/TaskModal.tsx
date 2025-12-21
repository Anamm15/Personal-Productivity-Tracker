"use client";

import { Modal } from "@/components/Modal";
import { useState } from "react";
import Calender from "@/components/Calender";
import {
  Calendar,
  Clock,
  AlignLeft,
  Type,
  Hash,
  Bell,
  ArrowRight,
} from "lucide-react";
import { useCreateTask } from "../../dashboard/hooks/useTasks";
import { localISODate } from "@/utils/datetime";

type TaskModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskModal({ setIsModalOpen }: TaskModalProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [tags, setTags] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reminder, setReminder] = useState("");
  const [color, setColor] = useState("");
  const { mutate: createTask } = useCreateTask();

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

  const handleCreateTask = () => {
    const tagsArr = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const lowerColor = color.toLowerCase();
    const colorAttrib = `bg-${lowerColor}-100/80 border-${lowerColor}-300 text-${lowerColor}-700`;

    const payload = {
      title,
      description,
      date: localISODate(date),
      tags: tagsArr,
      startTime,
      endTime,
      reminder,
      color: colorAttrib,
    };

    createTask(payload);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal title="Buat Task Baru" setIsModalOpen={setIsModalOpen}>
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Judul Task
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                <Type className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Selesaikan API Gateway"
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-stone-700 placeholder:text-stone-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Deskripsi
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                <AlignLeft className="w-5 h-5" />
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Catatan tambahan..."
                rows={3}
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-stone-700 placeholder:text-stone-300 resize-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Tanggal
            </label>
            <div
              onClick={() => setIsCalendarOpen(true)}
              className="relative group cursor-pointer"
            >
              <div className="absolute left-4 top-3.5 text-stone-400 group-hover:text-indigo-600 transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={formattedDate}
                readOnly
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none cursor-pointer hover:border-indigo-400 hover:bg-white transition-all font-semibold text-stone-700 pointer-events-none"
                // pointer-events-none agar klik tembus ke div wrapper
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Mulai
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                  <Clock className="w-4 h-4" />
                </div>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-stone-700 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Selesai
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                  <Clock className="w-4 h-4" />
                </div>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-stone-700 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Tags
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Dev, Urgent..."
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium text-stone-700 text-sm placeholder:text-stone-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Ingatkan
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-3 text-stone-400 group-focus-within:text-rose-500 transition-colors">
                  <Bell className="w-4 h-4" />
                </div>
                <input
                  type="time"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-rose-500 transition-all font-medium text-stone-700 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
              Warna
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                <Type className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Contoh: red, blue, green... (choose one)"
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-stone-700 placeholder:text-stone-300"
              />
            </div>
          </div>

          <button
            onClick={handleCreateTask}
            className="w-full mt-4 py-2.5 bg-stone-900 text-white rounded-xl  shadow-lg hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Mulai Perjalanan
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </Modal>

      {isCalendarOpen && (
        <Calender
          currentDate={date}
          setCurrentDate={(newDate) => {
            setDate(newDate);
            setIsCalendarOpen(false);
          }}
          setIsCalendarOpen={setIsCalendarOpen}
        />
      )}
    </div>
  );
}
