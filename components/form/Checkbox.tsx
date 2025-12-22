import { Check } from "lucide-react";

type FormCheckboxProps = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function FormCheckbox({ label, ...props }: FormCheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center w-5 h-5 border-2 border-stone-300 rounded-md group-hover:border-indigo-500 bg-white transition-colors">
        <input
          type="checkbox"
          className="peer appearance-none w-full h-full cursor-pointer"
          {...props}
          required
        />
        <Check
          className="w-3.5 h-3.5 text-indigo-600 opacity-0 peer-checked:opacity-100 absolute pointer-events-none transition-opacity"
          strokeWidth={4}
        />
      </div>
      <span className="text-md font-medium text-stone-500">{label}</span>
    </label>
  );
}
