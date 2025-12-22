export default function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-bold text-stone-500 uppercase mb-1.5 ml-1 tracking-wide">
      {children}
      {required && (
        <span
          className="text-red-500 ml-0.5 inline-block align-top"
          title="Must be filled"
        >
          *
        </span>
      )}
    </label>
  );
}
