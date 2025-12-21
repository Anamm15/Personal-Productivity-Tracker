"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Header from "./components/Header";
import GoalModal from "./components/GoalModal";
import MainContent from "./components/MainContent";
import { useGoalsQuery } from "./hooks/useGoal";
import { localISODate } from "@/utils/datetime";
import { GoalResponse } from "@/types/dto/goal";

export default function GoalsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: goalsData, isLoading } = useGoalsQuery(
    localISODate(selectedDate)
  );
  const [goals, setGoals] = useState(goalsData);

  useEffect(() => {
    setGoals(goalsData);
  }, [goalsData]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans relative overflow-x-hidden selection:bg-indigo-200">
      {/* Background Decororation */}
      <div className="fixed top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-indigo-300/20 blur-[120px] -z-10 mix-blend-multiply"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-125 h-125 rounded-full bg-rose-300/20 blur-[100px] -z-10 mix-blend-multiply"></div>

      {/* --- HEADER --- */}
      <Header
        currentDate={selectedDate}
        setIsModalOpen={setIsCreateModalOpen}
        setCurrentDate={setSelectedDate}
      />

      {/* --- MAIN CONTENT --- */}
      <MainContent
        goals={goals}
        setGoals={setGoals}
        isLoading={isLoading}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        setSelectedGoal={setSelectedGoal}
      />

      {/* --- FAB for Mobile --- */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-stone-900 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-105 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* --- NEW GOAL MODAL (Simple Structure) --- */}
      {isCreateModalOpen && (
        <GoalModal setIsModalOpen={setIsCreateModalOpen} goal={null} />
      )}

      {/* --- UPDATE GOAL MODAL (Simple Structure) --- */}
      {isUpdateModalOpen && selectedGoal && (
        <GoalModal
          setIsModalOpen={setIsUpdateModalOpen}
          isUpdate
          goal={selectedGoal}
        />
      )}
    </div>
  );
}
