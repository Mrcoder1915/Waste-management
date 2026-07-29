import { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/cx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
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
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
    secondary:
      "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
  };
  return (
    <button className={cx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
