import { CheckCircle2, Flame, LayoutGrid } from "lucide-react";

export const agendaItems = [
  {
    id: 1,
    startTime: "09:00",
    endTime: "10:30",
    title: "Daily Standup",
    tag: "Team",
    color: "bg-teal-100/80 text-teal-700 border border-teal-200",
  },
  {
    id: 2,
    startTime: "10:30",
    endTime: "12:00",
    title: "Deep Work: Backend API",
    tag: "Dev",
    color: "bg-violet-100/80 text-violet-700 border border-violet-200",
  },
  {
    id: 3,
    startTime: "13:00",
    endTime: "14:00",
    title: "Lunch & Break",
    tag: "Personal",
    color: "bg-orange-100/80 text-orange-700 border border-orange-200",
  },
  {
    id: 4,
    startTime: "14:00",
    endTime: "16:30",
    title: "Client Meeting",
    tag: "Meeting",
    color: "bg-rose-100/80 text-rose-700 border border-rose-200",
  },
];

export const priorityTasks = [
  {
    id: 101,
    title: "Finalisasi API Gateway",
    subtitle: "Critical Deadline",
    icon: <Flame />,
    accentBg: "bg-gradient-to-br from-rose-100 to-orange-100",
    accentText: "text-rose-600",
    shadow: "hover:shadow-rose-300",
  },
  {
    id: 102,
    title: "Fix Bug Autentikasi",
    subtitle: "High Priority",
    icon: <CheckCircle2 />,
    accentBg: "bg-gradient-to-br from-teal-100 to-emerald-100",
    accentText: "text-teal-600",
    shadow: "hover:shadow-teal-300",
  },
  {
    id: 103,
    title: "Drafting UI Dashboard",
    subtitle: "Creative Task",
    icon: <LayoutGrid />,
    accentBg: "bg-gradient-to-br from-violet-50 to-purple-50",
    accentText: "text-violet-600",
    shadow: "hover:shadow-violet-300",
  },
];
