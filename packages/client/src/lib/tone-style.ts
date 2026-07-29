export type Tone = "green" | "red" | "purple" | "blue" | "slate" | "amber";

export const TONE_BG: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-600",
  purple: "bg-purple-50 text-purple-600",
  blue: "bg-blue-50 text-blue-600",
  slate: "bg-slate-100 text-slate-600",
  amber: "bg-amber-50 text-amber-700",
};

export const TONE_DOT: Record<Tone, string> = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  slate: "bg-slate-400",
  amber: "bg-amber-500",
};

export const TONE_ICON_BG: Record<Tone, string> = {
  purple: "bg-purple-50 text-purple-500",
  blue: "bg-blue-50 text-blue-500",
  red: "bg-red-50 text-red-500",
  amber: "bg-amber-50 text-amber-500",
  green: "bg-emerald-50 text-emerald-500",
  slate: "bg-slate-100 text-slate-500",
};
