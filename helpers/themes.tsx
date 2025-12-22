import { CheckCircle2, Circle, Flame, LayoutGrid, Timer } from "lucide-react";

const tagThemes = {
  soft: [
    "bg-rose-100 text-rose-700",
    "bg-indigo-100 text-indigo-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-stone-100 text-stone-700",
  ],

  vibrant: [
    "bg-rose-500 text-white shadow-rose-200",
    "bg-indigo-500 text-white shadow-indigo-200",
    "bg-teal-500 text-white shadow-teal-200",
    "bg-orange-500 text-white shadow-orange-200",
    "bg-blue-600 text-white shadow-blue-200",
  ],

  outline: [
    "border border-rose-500 text-rose-600 bg-transparent",
    "border border-indigo-500 text-indigo-600 bg-transparent",
    "border border-emerald-500 text-emerald-600 bg-transparent",
    "border border-amber-500 text-amber-600 bg-transparent",
    "border border-cyan-500 text-cyan-600 bg-transparent",
  ],

  gradient: [
    "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-none",
    "bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-none",
    "bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-none",
    "bg-gradient-to-r from-orange-400 to-red-500 text-white border-none",
    "bg-gradient-to-r from-violet-400 to-purple-500 text-white border-none",
  ],

  glass: [
    "bg-white/20 text-white backdrop-blur-md border border-white/30",
    "bg-black/10 text-slate-800 backdrop-blur-md border border-black/10",
  ],
};

export const getTagColor = (
  tagName: string,
  theme: "soft" | "vibrant" | "outline" | "gradient" = "soft"
) => {
  if (!tagName) return "";

  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = tagThemes[theme];
  const index = Math.abs(hash % colors.length);
  return colors[index];
};

export const StatusBadge = ({ status }: { status?: string }) => {
  if (!status) return null;

  const styles = {
    COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
    CANCELED: "bg-rose-100 text-rose-700 border-rose-200",
    DEFAULT: "bg-stone-100 text-stone-600 border-stone-200",
  };

  // Fallback ke DEFAULT jika status tidak dikenali
  const activeStyle = styles[status as keyof typeof styles] || styles.DEFAULT;

  return (
    <span
      className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider flex items-center gap-1 ${activeStyle}`}
    >
      {status === "COMPLETED" && <CheckCircle2 className="w-3 h-3" />}
      {status === "IN_PROGRESS" && <Timer className="w-3 h-3" />}
      {status === "PENDING" && <Circle className="w-3 h-3" />}
      {status}
    </span>
  );
};

export const CARD_THEMES = [
  {
    icon: <Flame />,
    accentBg: "bg-gradient-to-br from-rose-100 to-orange-100",
    accentText: "text-rose-600",
    shadow: "hover:shadow-rose-300",
    defaultSubtitle: "Critical Deadline",
  },
  {
    icon: <CheckCircle2 />,
    accentBg: "bg-gradient-to-br from-teal-100 to-emerald-100",
    accentText: "text-teal-600",
    shadow: "hover:shadow-teal-300",
    defaultSubtitle: "High Priority",
  },
  {
    icon: <LayoutGrid />,
    accentBg: "bg-gradient-to-br from-violet-50 to-purple-50",
    accentText: "text-violet-600",
    shadow: "hover:shadow-violet-300",
    defaultSubtitle: "Creative Task",
  },
];
