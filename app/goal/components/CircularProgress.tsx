import { getThemeColors } from "@/types/theme";

export default function CircularProgress({
  progress,
  theme,
}: {
  progress: number;
  theme: string;
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const colors = getThemeColors(theme);

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-stone-200"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${colors.ring} transition-all duration-1000 ease-out`}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute text-xs font-bold ${colors.text}`}>
        {progress}%
      </span>
    </div>
  );
}
