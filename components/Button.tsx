type ButtonProps = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ElementType;
  color?: string;
};

export default function Button({
  children,
  className,
  color,
  type,
  icon,
  onClick,
}: ButtonProps) {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-xl cursor-pointer py-1.5 px-4 flex justify-center items-center text-lg gap-2 ${color} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />} {children}
    </button>
  );
}
