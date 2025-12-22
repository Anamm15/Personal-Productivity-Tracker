import { Calendar } from "lucide-react";
import Label from "./Label";

type FormInputDateProps = {
  label: string;
  formattedDate: string;
  required?: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FormInputDate({
  label,
  formattedDate,
  required = false,
  setIsCalendarOpen,
}: FormInputDateProps) {
  return (
    <div className="space-y-1.5">
      <Label required={required}>{label}</Label>
      <div
        onClick={() => setIsCalendarOpen(true)}
        className="relative group cursor-pointer"
      >
        <div className="absolute left-4 top-3.5 text-stone-400 group-hover:text-indigo-600 transition-colors">
          <Calendar className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={formattedDate}
          required={required}
          readOnly
          className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none cursor-pointer hover:border-indigo-400 hover:bg-white transition-all font-semibold text-stone-700 pointer-events-none"
        />
      </div>
    </div>
  );
}
