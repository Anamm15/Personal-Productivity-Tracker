export default function InputWrapper({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3 top-3.5 text-stone-400 group-focus-within:text-indigo-600 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      )}
      {children}
    </div>
  );
}
