export const getThemeColors = (theme?: string) => {
  if (!theme) {
    // cari default baru
    return {
      bg: "bg-violet-50",
      text: "text-violet-900",
      border: "border-violet-100",
      accent: "text-violet-600",
      ring: "stroke-violet-600",
      fill: "fill-violet-100",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const themes: any = {
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-900",
      border: "border-indigo-100",
      accent: "text-indigo-600",
      ring: "stroke-indigo-600",
      fill: "fill-indigo-100",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-100",
      accent: "text-emerald-600",
      ring: "stroke-emerald-600",
      fill: "fill-emerald-100",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-100",
      accent: "text-rose-600",
      ring: "stroke-rose-600",
      fill: "fill-rose-100",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-100",
      accent: "text-amber-600",
      ring: "stroke-amber-600",
      fill: "fill-amber-100",
    },
  };
  return themes[theme] || themes.indigo;
};
