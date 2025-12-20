/* eslint-disable @typescript-eslint/no-explicit-any */
import InputWrapper from "./InputWrapper";
import Label from "./Label";

export default function FormSelect({ label, icon, options, ...props }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <InputWrapper icon={icon}>
        <select
          {...props}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium text-stone-700 text-sm appearance-none cursor-pointer`}
        >
          {options.map((opt: { value: string; label: string }) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </InputWrapper>
    </div>
  );
}
