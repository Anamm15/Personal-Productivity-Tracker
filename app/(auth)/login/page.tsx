"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, CalendarDays, Loader2 } from "lucide-react";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans relative flex items-center justify-center p-4 overflow-hidden selection:bg-teal-200">
      {/* --- BACKGROUND DECORATION (Aurora) --- */}
      {/* Blob Violet di kiri atas */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-violet-200/40 blur-[100px] mix-blend-multiply animate-pulse-slow pointer-events-none"></div>
      {/* Blob Teal di kanan bawah */}
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 rounded-full bg-teal-200/40 blur-[100px] mix-blend-multiply animate-pulse-slow delay-1000 pointer-events-none"></div>
      {/* Blob Orange kecil di tengah untuk warmth */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full bg-orange-100/50 blur-[80px] mix-blend-multiply pointer-events-none"></div>

      {/* --- MAIN GLASS CARD --- */}
      <div className="w-full max-w-md relative z-10">
        {/* Dekorasi Logo Melayang */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="p-4 bg-linear-to-br from-teal-500 to-violet-600 rounded-2xl shadow-xl shadow-teal-500/30 ring-4 ring-white/50 backdrop-blur-md">
            <CalendarDays className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl p-8 pt-16 md:p-10 md:pt-20 animate-in zoom-in-95 duration-500">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-stone-500 text-sm md:text-base font-medium">
              Lanjutkan produktivitasmu hari ini.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-teal-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-semibold text-stone-700 placeholder:text-stone-300"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-violet-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl outline-none focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-semibold text-stone-700 placeholder:text-stone-300"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-2 bg-stone-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              {/* linear Shine Effect on Hover */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-8 text-stone-500 font-medium text-sm">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-teal-600 font-bold hover:underline hover:text-teal-700"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
