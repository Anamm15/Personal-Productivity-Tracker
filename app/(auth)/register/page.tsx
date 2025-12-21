"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Loader2,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { useRegister } from "./hooks/useRegister";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useRegister();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Password Strength Logic (Sederhana)
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const len = formData.password.length;
    let score = 0;
    if (len > 4) score += 33; // Panjang minimal
    if (len > 8) score += 33; // Panjang ideal
    if (/[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password))
      score += 34; // Kombinasi
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStrength(score);
  }, [formData.password]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  const getStrengthColor = () => {
    if (strength < 33) return "bg-rose-500";
    if (strength < 66) return "bg-amber-500";
    return "bg-teal-500";
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans relative flex items-center justify-center p-4 overflow-hidden selection:bg-teal-200">
      {/* --- Background Decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-150 h-150 rounded-full bg-rose-200/30 blur-[120px] mix-blend-multiply animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-125 h-125 rounded-full bg-indigo-200/30 blur-[120px] mix-blend-multiply animate-pulse-slow delay-700 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Decoration */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="p-4 bg-linear-to-br from-indigo-500 to-rose-500 rounded-2xl shadow-xl shadow-indigo-500/30 ring-4 ring-white/50 backdrop-blur-md">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-2xl p-8 pt-16 md:p-10 md:pt-20 animate-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-stone-800 tracking-tight mb-2">
              Join the Journey
            </h1>
            <p className="text-stone-500 text-sm md:text-base font-medium">
              Mulai atur hidup produktifmu sekarang.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* 1. Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Nama Lengkap
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nama Panggilan Kamu"
                  className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-stone-700 placeholder:text-stone-300"
                  required
                />
              </div>
            </div>

            {/* 2. Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="urmail@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-stone-700 placeholder:text-stone-300"
                  required
                />
              </div>
            </div>

            {/* 3. Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-rose-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-12 pr-12 py-3.5 bg-stone-50/50 border border-stone-200 rounded-2xl outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-semibold text-stone-700 placeholder:text-stone-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="flex items-center gap-2 mt-2 ml-1">
                  <div className="h-1.5 flex-1 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-500 ease-out`}
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase">
                    {strength < 33
                      ? "Weak"
                      : strength < 66
                      ? "Medium"
                      : "Strong"}
                  </span>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 border-2 border-stone-300 rounded-md group-hover:border-indigo-500 bg-white transition-colors">
                <input
                  type="checkbox"
                  className="peer appearance-none w-full h-full cursor-pointer"
                  required
                />
                <Check
                  className="w-3.5 h-3.5 text-indigo-600 opacity-0 peer-checked:opacity-100 absolute pointer-events-none transition-opacity"
                  strokeWidth={4}
                />
              </div>
              <span className="text-xs font-medium text-stone-500">
                Saya setuju dengan{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Syarat & Ketentuan
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-stone-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-8 text-stone-500 font-medium text-sm">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-bold hover:underline hover:text-indigo-700"
          >
            Login Disini
          </Link>
        </p>
      </div>
    </div>
  );
}
