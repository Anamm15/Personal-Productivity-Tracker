"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Loader2, Plus } from "lucide-react";
import MainFocusSection from "./components/MainFocus";
import TimelineSection from "./components/Timeline";
import { Modal } from "@/components/Modal";
import { useQuickAddTask, useTasks } from "./hooks/useTasks";
import DetailTaskModal from "../timeline/components/DetailTaskModal";
import { TaskResponse } from "@/types/dto/task";
import { subscribePush } from "@/helpers/subscribePush";
import { localISODate } from "@/utils/datetime";

export default function DashboardEnhanced() {
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [isDetailTaskModalOpen, setIsDetailTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);
  const [command, setCommand] = useState("");
  const { isoDate } = localISODate(new Date());
  const { data: tasks, isLoading, isError, error } = useTasks(isoDate);
  const { mutate: createQuickTask } = useQuickAddTask();
  const [priorityTasks, setPriorityTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    subscribePush();
  }, []);

  useEffect(() => {
    if (tasks) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPriorityTasks(tasks.filter((task) => task.isPriority));
    }
  }, [tasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createQuickTask(command);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-rose-500 flex gap-2 justify-center mt-10">
        <AlertCircle /> Failed to Load Data: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-teal-200 selection:text-teal-900 relative overflow-hidden font-sans">
      {/* --- DEKORASI LATAR BELAKANG (Aurora Blooms) --- */}
      {/* Background Decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-teal-200/40 blur-[100px] z-10 mix-blend-multiply animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 rounded-full bg-orange-200/40 blur-[120px] z-10 mix-blend-multiply animate-pulse-slow delay-700 pointer-events-none"></div>
      <div className="absolute top-[40%] left-[30%] w-100 h-100 rounded-full bg-violet-200/50 blur-[90px] z-10 mix-blend-multiply pointer-events-none"></div>

      <main className="max-w-5xl mx-auto px-4 pb-28 pt-8 space-y-10">
        <MainFocusSection priorityTasks={priorityTasks} />
        <TimelineSection
          setSelectedTask={setSelectedTask}
          setIsModalOpen={setIsDetailTaskModalOpen}
          tasks={tasks || []}
        />
      </main>

      {/* --- Quick Add FAB (Gradient Button) --- */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => setIsQuickAddModalOpen(true)}
          className="group flex items-center justify-center w-14 h-14 bg-linear-to-tr from-stone-800 to-stone-900 text-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-teal-500/30 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <Plus className="w-8 h-8 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* --- MODAL (Detail Task) --- */}
      {isDetailTaskModalOpen && (
        <Modal title="Task Detail" setIsModalOpen={setIsDetailTaskModalOpen}>
          <DetailTaskModal
            task={selectedTask}
            setTask={setSelectedTask}
            setIsModalOpen={setIsDetailTaskModalOpen}
          />
        </Modal>
      )}

      {/* --- MODAL (Quick Add Task) --- */}
      {isQuickAddModalOpen && (
        <Modal setIsModalOpen={setIsQuickAddModalOpen} title="Quick Add Task">
          <input
            type="text"
            placeholder="Contoh: Meeting jam 10 @08:30-10:00"
            className="w-full p-4 bg-stone-50/50 border border-stone-200 rounded-2xl outline-none focus:border-teal-500 transition-colors"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-stone-900 text-white py-2.5 rounded-xl mt-4 cursor-pointer"
          >
            Submit
          </button>
        </Modal>
      )}
    </div>
  );
}
