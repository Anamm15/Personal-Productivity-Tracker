"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import Calender from "@/components/Calender";
import {
  Gift,
  Calendar as CalendarIcon,
  Type,
  AlignLeft,
  LayoutGrid,
  Palette,
  ArrowRight,
} from "lucide-react";
import { useCreateGoal, useUpdateGoal } from "../hooks/useGoal";
import FormInput from "@/components/form/Input";
import FormTextarea from "@/components/form/TextArea";
import FormSelect from "@/components/form/Select";
import Label from "@/components/form/Label";
import { GoalResponse } from "@/types/dto/goal";
import { dateStringToDate } from "@/utils/datetime";

type GoalModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate?: boolean;
  goal: GoalResponse | null;
};

function getInitialFormState(goal: GoalResponse | null) {
  return {
    title: goal ? goal.title : "",
    description: goal ? goal.description : "",
    category: goal ? goal.category : "",
    start: goal ? dateStringToDate(goal.start) : new Date(),
    deadline: goal ? dateStringToDate(goal.deadline) : new Date(),
    motivation: goal ? goal.motivation : "",
    reward: goal ? goal.reward : "",
    theme: goal ? goal.theme : "",
  };
}

export default function GoalModal({
  setIsModalOpen,
  isUpdate = false,
  goal,
}: GoalModalProps) {
  const [formData, setFormData] = useState(getInitialFormState(goal));

  // State untuk manajemen Kalender
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState<
    "start" | "deadline" | null
  >(null);

  const { mutate: createGoal } = useCreateGoal();
  const { mutate: updateGoal } = useUpdateGoal();

  // Helper untuk update state form
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Helper format tanggal ke String yang cantik untuk UI
  const formatDateDisplay = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Helper format tanggal ke YYYY-MM-DD untuk API
  const formatDateApi = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCreateGoal = () => {
    const payload = {
      ...formData,
      start: formatDateApi(formData.start),
      deadline: formatDateApi(formData.deadline),
    };

    console.log("Submitting:", payload);
    if (isUpdate) {
      updateGoal({ id: goal!.id, data: payload });
    } else {
      createGoal(payload);
    }
    setIsModalOpen(false);
  };

  const openCalendar = (field: "start" | "deadline") => {
    setActiveDateField(field);
    setIsCalendarOpen(true);
  };

  return (
    <div>
      <Modal title="Mulai Perjalanan Baru" setIsModalOpen={setIsModalOpen}>
        <div className="space-y-5">
          {/* Title */}
          <FormInput
            label="Judul Goal"
            icon={Type}
            placeholder="Contoh: Menabung 100 Juta"
            value={formData.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("title", e.target.value)
            }
          />

          {/* Description */}
          <FormTextarea
            label="Deskripsi"
            icon={AlignLeft}
            placeholder="Jelaskan detail targetmu..."
            rows={2}
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange("description", e.target.value)
            }
          />

          {/* Motivation*/}
          <FormTextarea
            label="Motivasi (The Why)"
            placeholder="Kenapa ini penting?"
            rows={2}
            value={formData.motivation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("motivation", e.target.value)
            }
          />

          {/* Reward */}
          <FormInput
            label="Hadiah (Reward)"
            icon={Gift}
            placeholder="Self reward..."
            value={formData.reward}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("reward", e.target.value)
            }
          />

          {/* Category & Theme Grid */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Kategori"
              icon={LayoutGrid}
              placeholder="Finance, Health..."
              value={formData.category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("category", e.target.value)
              }
            />

            <FormSelect
              label="Tema Warna"
              icon={Palette}
              value={formData.theme}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("theme", e.target.value)
              }
              options={[
                { value: "indigo", label: "Indigo (Fokus)" },
                { value: "emerald", label: "Emerald (Health)" },
                { value: "rose", label: "Rose (Passion)" },
                { value: "amber", label: "Amber (Wealth)" },
              ]}
            />
          </div>

          {/* Date Picker Section - Menggunakan Custom Calendar Logic */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Mulai</Label>
              <div
                onClick={() => openCalendar("start")}
                className="relative group cursor-pointer"
              >
                <div className="absolute left-3 top-3.5 text-stone-400 group-hover:text-indigo-600 transition-colors">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={formatDateDisplay(formData.start)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none hover:bg-white hover:border-indigo-400 cursor-pointer transition-all font-semibold text-stone-700 text-sm pointer-events-none"
                />
              </div>
            </div>

            <div>
              <Label>Deadline</Label>
              <div
                onClick={() => openCalendar("deadline")}
                className="relative group cursor-pointer"
              >
                <div className="absolute left-3 top-3.5 text-stone-400 group-hover:text-rose-500 transition-colors">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  readOnly
                  value={formatDateDisplay(formData.deadline)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none hover:bg-white hover:border-rose-400 cursor-pointer transition-all font-semibold text-stone-700 text-sm pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleCreateGoal}
            className="w-full mt-4 py-2.5 bg-stone-900 text-white rounded-xl shadow-lg hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-medium"
          >
            Start The Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </Modal>

      {/* Logic Kalender Terintegrasi */}
      {isCalendarOpen && activeDateField && (
        <Calender
          currentDate={formData[activeDateField]}
          setCurrentDate={(newDate) => {
            handleChange(activeDateField, newDate);
            setIsCalendarOpen(false);
          }}
          setIsCalendarOpen={setIsCalendarOpen}
        />
      )}
    </div>
  );
}
