import { Goal } from "@/types";

export const MockGoals: Goal[] = [
  {
    id: 1,
    title: "Selesaikan Modul API Microservice",
    category: "Career Growth",
    deadline: "31 Des 2025",
    motivation: "Agar bisa apply remote job dengan salary USD",
    reward: "Beli Mechanical Keyboard Baru",
    theme: "indigo",
    milestones: [
      {
        id: 101,
        title: "Setup Golang Fiber & Folder Structure",
        isCompleted: true,
      },
      { id: 102, title: "Implement JWT Authentication", isCompleted: true },
      {
        id: 103,
        title: "Integrate Kafka for Event Driven",
        isCompleted: false,
      },
      { id: 104, title: "Unit Testing & Coverage > 80%", isCompleted: false },
    ],
  },
  {
    id: 2,
    title: "Turun Berat Badan 5kg",
    category: "Health",
    deadline: "15 Jan 2026",
    motivation: "Supaya badan lebih fit saat ngoding lama",
    reward: "Staycation Weekend di Bandung",
    theme: "emerald",
    milestones: [
      { id: 201, title: "Daftar Gym Membership", isCompleted: true },
      {
        id: 202,
        title: "Lari pagi 3x seminggu (Week 1)",
        isCompleted: false,
      },
      { id: 203, title: "Meal Prep hari Minggu", isCompleted: false },
    ],
  },
];
