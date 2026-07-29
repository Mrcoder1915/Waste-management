import { ReactNode } from "react";
import { cx } from "../../lib/cx";

interface PanelProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}
export function Panel({
  title,
  subtitle,
  action,
  className,
  children,
}: PanelProps) {
  return (
    <div
      className={cx(
        "bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5",
        className,
      )}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
