import InputWrapper from "./InputWrapper";
import Label from "./Label";

type FormInput = {
  label: string;
  icon?: React.ElementType;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  required?: boolean;
};

export default function FormInput({
  label,
  icon,
  className,
  required = false,
  ...props
}: FormInput) {
  return (
    <div>
      <div className="flex gap-1 items-start">
        <Label required={required}>{label}</Label>
      </div>
      <InputWrapper icon={icon}>
        <input
          {...props}
          required={required}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-stone-700 placeholder:text-stone-300 text-sm ${className}`}
        />
      </InputWrapper>
    </div>
  );
}
