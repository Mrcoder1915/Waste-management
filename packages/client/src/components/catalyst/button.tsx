import { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/cx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "brand"
    | "dark"
    | "destructive"
    | "soft"
    | "ghost"
    | "outline"
    | "warning";
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors",
    secondary:
      "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors",

    // Brand/Corporate Variant
    brand:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",

    // Minimalist / High-Contrast Dark
    dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors",

    // Destructive / Danger (For delete or irreversible actions)
    destructive:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",

    // Soft/Subtle (Alternative secondary with background tint)
    soft: "bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",

    // Ghost (Completely transparent background until hover, great for secondary nav or icon buttons)
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors",

    // Outline / Bordered (Cleaner secondary look)
    outline:
      "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors",

    // Warning / Attention (For upgrade banners or cautious alerts)
    warning:
      "bg-amber-500 text-amber-950 hover:bg-amber-600 shadow-sm transition-colors",
  };
  return (
    <button className={cx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
