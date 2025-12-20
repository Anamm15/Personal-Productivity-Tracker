export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold text-stone-500 uppercase mb-1.5 ml-1 tracking-wide">
      {children}
    </label>
  );
}
