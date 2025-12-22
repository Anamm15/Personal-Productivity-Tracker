import { TaskResponse } from "@/types/dto/task";
import { AlertCircle, CheckCircle2, Timer, XCircle } from "lucide-react";

export const getStatusConfig = (status: TaskResponse["status"]) => {
  switch (status) {
    case "COMPLETED":
      return {
        color: "bg-emerald-100 text-emerald-700",
        icon: CheckCircle2,
        label: "Completed",
      };
    case "IN_PROGRESS":
      return {
        color: "bg-blue-100 text-blue-700",
        icon: Timer,
        label: "In Progress",
      };
    case "CANCELED":
      return {
        color: "bg-red-100 text-red-700",
        icon: XCircle,
        label: "Canceled",
      };
    default:
      return {
        color: "bg-amber-100 text-amber-700",
        icon: AlertCircle,
        label: "Pending",
      };
  }
};
