import { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";

interface IconActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "slate" | "red" | "green";
  children: ReactNode;
}

export function IconAction({
  tone = "slate",
  children,
  className,
  ...props
}: IconActionProps) {
  const tones: Record<NonNullable<IconActionProps["tone"]>, string> = {
    slate: "bg-slate-100 text-slate-500 hover:bg-slate-200",
    red: "bg-red-50 text-red-500 hover:bg-red-100",
    green: "bg-emerald-50 text-emerald-500 hover:bg-emerald-100",
  };
  return (
    <button
      className={cx(
        "size-8 rounded-lg flex items-center justify-center transition-colors",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
