import InputWrapper from "./InputWrapper";
import Label from "./Label";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormTextarea({ label, icon, ...props }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <InputWrapper icon={icon}>
        <textarea
          {...props}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-stone-700 placeholder:text-stone-300 text-sm resize-none`}
        />
      </InputWrapper>
    </div>
  );
}
