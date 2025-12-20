"use client";

import React, { useState } from "react";
import { Task } from "@/types";
import { tasks } from "./components/MockData";
import { Modal } from "@/components/Modal";
import Calender from "@/components/Calender";
import MainTimelineContent from "./components/MainContent";
import Header from "./components/Header";

export default function DailyTimelineWithDate() {
  const [currentDate, setCurrentDate] = useState(new Date()); // State Tanggal Utama
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State Modal Kalender
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
        setIsTaskModalOpen={setIsTaskModalOpen}
      />

      {/* --- Timeline Content --- */}
      <MainTimelineContent
        tasks={tasks}
        setSelectedTask={setSelectedTask}
        setIsTaskModalOpen={setIsTaskModalOpen}
      />

      {/* --- Custom Calender Modal --- */}
      {isCalendarOpen && (
        <Calender
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setIsCalendarOpen={setIsCalendarOpen}
        />
      )}

      {isTaskModalOpen && (
        <Modal title="Detail Tugas" setIsModalOpen={setIsTaskModalOpen}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            esse recusandae quidem voluptatibus magni dicta!
          </p>
        </Modal>
      )}
    </div>
  );
}
