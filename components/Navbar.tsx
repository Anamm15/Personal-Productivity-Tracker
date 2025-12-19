"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, X, Home, Clock, Target, BookUser } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      name: "Timeline",
      href: "/timeline",
      icon: <Clock className="w-4 h-4" />,
    },
    { name: "Goals", href: "/goal", icon: <Target className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/50 px-6 py-4 supports-backdrop-filter:bg-white/60">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* --- Greeting --- */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-linear-to-tr from-teal-500 to-violet-500 rounded-xl shadow-lg shadow-teal-500/20">
            <BookUser className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-stone-500 font-medium">
              Kamis, 18 Des
            </p>
            <h1 className="text-lg md:text-2xl font-extrabold tracking-tight text-stone-800 leading-tight">
              Hi,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-violet-600">
                Dev!
              </span>
            </h1>
          </div>
        </div>

        {/* --- Dekstop Navigation (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="group relative py-2"
              >
                <span
                  className={`
                  text-md font-bold tracking-wide transition-colors duration-300
                  ${
                    isActive
                      ? "text-teal-700"
                      : "text-stone-500 hover:text-teal-600"
                  }
                `}
                >
                  {link.name}
                </span>

                <span
                  className={`
                  absolute bottom-0 left-0 h-[2.5px] rounded-full bg-linear-to-r from-teal-400 to-violet-500 transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "w-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                      : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
                  }
                `}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* --- Right Actions (Bell & Mobile Menu Toggle) --- */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="p-2.5 rounded-xl bg-white/50 hover:bg-white border border-stone-100 hover:border-teal-200 shadow-sm transition-all relative group">
            <Bell className="w-5 h-5 text-stone-500 group-hover:text-teal-600 transition-colors" />
            <span className="absolute top-2.5 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-lg"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown (Responsive) --- */}
      <div
        className={`
        md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-stone-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat diklik
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                  ${
                    isActive
                      ? "bg-teal-50 text-teal-700 border border-teal-100"
                      : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                  }
                `}
              >
                {/* Icon wrapper */}
                <span
                  className={`p-1.5 rounded-lg ${
                    isActive ? "bg-white" : "bg-stone-100"
                  }`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
