"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import Header from "./components/Header";
import GoalModal from "./components/GoalModal";
import MainContent from "./components/MainContent";

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans relative overflow-x-hidden selection:bg-indigo-200">
      {/* Background Decororation */}
      <div className="fixed top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-indigo-300/20 blur-[120px] -z-10 mix-blend-multiply"></div>
      <div className="fixed bottom-[10%] right-[-10%] w-125 h-125 rounded-full bg-rose-300/20 blur-[100px] -z-10 mix-blend-multiply"></div>

      {/* --- HEADER --- */}
      <Header setIsModalOpen={setIsModalOpen} />

      {/* --- MAIN CONTENT --- */}
      <MainContent />

      {/* --- FAB for Mobile --- */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-stone-900 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-105 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* --- NEW GOAL MODAL (Simple Structure) --- */}
      {isModalOpen && <GoalModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
