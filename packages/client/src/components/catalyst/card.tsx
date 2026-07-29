import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { Tone } from "../../lib/tone-style";
import { IconBadge } from "./badge";

export interface StatCardProps {
  icon: LucideIcon;
  tone: Tone;
  label: string;
  value: string;
  sub: string;
}

export const CardContainer = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2  bg-noneshadow gap-6 ${className}`}
      {...props}
    />
  );
};

export const Card = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={`min-w-35 shadow-2xl bg-(--card-bg-resolve) rounded-(--card-rounded-resolve) [--card-rounded-resolve:var(--card-rounded,0.5rem)] [--card-bg-resolve:var(--card-bg,rgba(0,0,0,.1))]  p-5 flex  gap-4 ${className}`}
      {...props}
    ></div>
  );
};

export function StatCard({ icon, tone, label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-5 flex items-center gap-4">
      <IconBadge icon={icon} tone={tone} />
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-2xl font-semibold text-slate-900 leading-tight">
          {value}
        </p>
        <p className="text-[11px] text-slate-400">{sub}</p>
      </div>
    </div>
  );
}
