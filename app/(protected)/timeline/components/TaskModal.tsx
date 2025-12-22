"use client";

import { Modal } from "@/components/Modal";
import { useState } from "react";
import Calender from "@/components/Calender";
import {
  Clock,
  AlignLeft,
  Type,
  Hash,
  Bell,
  ArrowRight,
  Palette,
} from "lucide-react";
import { useCreateTask } from "../../dashboard/hooks/useTasks";
import { localISODate } from "@/utils/datetime";
import FormInput from "@/components/form/Input";
import FormTextarea from "@/components/form/TextArea";
import FormInputDate from "@/components/form/Date";
import FormCheckbox from "@/components/form/Checkbox";
import { TaskCreateRequest } from "@/types/dto/task";

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
  const [isPriority, setIsPriority] = useState(false);
  const [tagPriority, setTagPriority] = useState("");
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

    // Buat objek awal dengan field yang pasti ada
    const basePayload: TaskCreateRequest = {
      title,
      date: localISODate(date).isoDate,
      startTime,
      endTime,
    };

    // Gabungkan dengan field opsional yang sudah difilter
    const optionalFields = Object.fromEntries(
      Object.entries({
        description,
        tags: tagsArr,
        reminder,
        color: colorAttrib,
        isPriority,
        tagPriority,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, v]) => v !== "" && v !== undefined && v !== null)
    );

    const payload: TaskCreateRequest = { ...basePayload, ...optionalFields };

    createTask(payload);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal title="Create New Task" setIsModalOpen={setIsModalOpen}>
        <div className="space-y-5">
          <FormInput
            label="Title"
            required
            placeholder="Task Title"
            type="text"
            icon={Type}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <FormTextarea
            label="Description"
            placeholder="Task Description"
            type="text"
            icon={AlignLeft}
            rows={3}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />

          <FormInputDate
            label="Date"
            required
            formattedDate={formattedDate}
            setIsCalendarOpen={setIsCalendarOpen}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Start"
              placeholder="00:00"
              required
              type="time"
              icon={Clock}
              value={startTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStartTime(e.target.value)
              }
            />

            <FormInput
              label="End"
              placeholder="00:00"
              required
              type="time"
              icon={Clock}
              value={endTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEndTime(e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Tags"
              placeholder="Study, Dev, Work, etc"
              type="text"
              icon={Hash}
              value={tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTags(e.target.value)
              }
            />

            <FormInput
              label="Reminder"
              placeholder="00:00"
              type="time"
              icon={Bell}
              value={reminder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReminder(e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Color"
              placeholder="Color name in english"
              type="text"
              icon={Palette}
              value={color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setColor(e.target.value)
              }
            />

            <FormInput
              label="Tag Priority"
              placeholder="Tag Priority"
              type="text"
              icon={Hash}
              value={tagPriority}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTagPriority(e.target.value)
              }
            />
          </div>

          <FormCheckbox
            label="Set as Priority"
            checked={isPriority}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsPriority(e.target.checked)
            }
          />

          <button
            onClick={handleCreateTask}
            className="w-full mt-4 py-2.5 bg-stone-900 text-white rounded-xl  shadow-lg hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            Start the Journey
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
