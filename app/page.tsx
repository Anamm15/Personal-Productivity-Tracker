"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import MainFocusSection from "./components/MainFocus";
import TimelineSection from "./components/Timeline";

export default function DashboardEnhanced() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background selection:bg-teal-200 selection:text-teal-900 relative overflow-hidden font-sans">
      {/* --- DEKORASI LATAR BELAKANG (Aurora Blooms) --- */}
      {/* Blob besar yang diburamkan untuk memberikan warna ambien */}
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-teal-200/40 blur-[100px] z-10 mix-blend-multiply animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 rounded-full bg-orange-200/40 blur-[120px] z-10 mix-blend-multiply animate-pulse-slow delay-700"></div>
      <div className="absolute top-[40%] left-[30%] w-100 h-100 rounded-full bg-violet-200/50 blur-[90px] z-10 mix-blend-multiply"></div>

      {/* --- HEADER (Glassmorphism style) --- */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 pb-28 pt-8 space-y-10">
        <MainFocusSection />
        <TimelineSection />
      </main>

      {/* --- QUICK ADD FAB (Gradient Button) --- */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center justify-center w-14 h-14 bg-linear-to-tr from-stone-800 to-stone-900 text-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-teal-500/30 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <Plus className="w-8 h-8 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* --- MODAL (Tampilan sama seperti sebelumnya, bisa disesuaikan nanti) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-4xl shadow-2xl p-6 md:p-8 animate-in slide-in-from-bottom-10 duration-300 border border-white/50">
            <h3 className="text-xl font-bold text-stone-800 mb-6">
              Quick Add Task
            </h3>
            {/* ... (Isi modal sama seperti sebelumnya, disingkat untuk ringkas) ... */}
            <input
              type="text"
              placeholder="Contoh: Meeting jam 10"
              className="w-full p-4 bg-stone-50/50 border border-stone-200 rounded-2xl mb-4 outline-none focus:border-teal-500 transition-colors"
              autoFocus
            />
            <button className="w-full py-4 bg-linear-to-r from-teal-600 to-violet-600 text-white rounded-2xl font-bold">
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
