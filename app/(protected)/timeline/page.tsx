"use client";

import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import Calender from "@/components/Calender";
import MainTimelineContent from "./components/MainContent";
import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import { TaskResponse } from "@/types/dto/task";

export default function DailyTimelineWithDate() {
  const [currentDate, setCurrentDate] = useState(new Date()); // State Tanggal Utama
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State Modal Kalender
  const [isDetailTaskModalOpen, setIsDetailTaskModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans relative overflow-x-hidden selection:bg-teal-200">
      {/* Background Decoration */}
      <div className="fixed top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-teal-200/40 blur-[100px] z-10 mix-blend-multiply opacity-70 animate-pulse"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-150 h-150 rounded-full bg-orange-200/40 blur-[120px] z-10 mix-blend-multiply opacity-70"></div>

      {/* --- Header Sticky --- */}
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setIsCalendarOpen={setIsCalendarOpen}
        setIsTaskModalOpen={setIsCreateTaskModalOpen}
      />

      {/* --- Timeline Content --- */}
      <MainTimelineContent
        setSelectedTask={setSelectedTask}
        setIsTaskModalOpen={setIsDetailTaskModalOpen}
      />

      {/* --- Custom Calender Modal --- */}
      {isCalendarOpen && (
        <Calender
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setIsCalendarOpen={setIsCalendarOpen}
        />
      )}

      {isDetailTaskModalOpen && (
        <Modal title="Detail Tugas" setIsModalOpen={setIsDetailTaskModalOpen}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            esse recusandae quidem voluptatibus magni dicta!
          </p>
        </Modal>
      )}

      {isCreateTaskModalOpen && (
        <Modal
          title="Buat Tugas Baru"
          setIsModalOpen={setIsCreateTaskModalOpen}
        >
          <TaskModal setIsModalOpen={setIsCreateTaskModalOpen} />
        </Modal>
      )}
    </div>
  );
}
