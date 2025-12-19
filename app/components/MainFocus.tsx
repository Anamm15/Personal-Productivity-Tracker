import { ArrowUpRight } from "lucide-react";
import React from "react";
import { priorityTasks } from "./MockData";

export default function MainFocusSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5 px-1">
        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-3">
          Fokus Utama Hari Ini
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {priorityTasks.map((task, idx) => (
          <div
            key={task.id}
            className={`group relative p-6 rounded-4xl bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ${task.shadow} transition-all duration-300 cursor-pointer hover:-translate-y-1`}
          >
            <div
              className={`absolute inset-0 rounded-4xl ${task.accentBg} -z-10`}
            ></div>

            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-2xl bg-white/90 shadow-sm ${task.accentText}`}
              >
                {React.cloneElement(task.icon, { className: "w-6 h-6" })}
              </div>
              <div className="text-4xl font-black text-stone-400/40 group-hover:text-stone-400/80 transition-colors select-none font-serif italic">
                0{idx + 1}
              </div>
            </div>
            <h3 className="font-bold text-stone-800 text-lg leading-tight mb-1 pr-4">
              {task.title}
            </h3>
            <p className="text-sm text-stone-500 font-medium">
              {task.subtitle}
            </p>

            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className={`w-5 h-5 ${task.accentText}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
