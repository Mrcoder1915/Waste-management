import { Bell, ChevronDown } from "lucide-react";
import { useSession } from "../lib/auth-client";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { data } = useSession();
  const initials = data?.user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative size-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100">
          <Bell className="size-4.5" />
          <span className="absolute top-1.5 right-1.5 size-3.5 rounded-full bg-red-500 text-white text-[9px] leading-[14px]">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="size-8 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center">
            {initials}
          </div>
          <span className="text-sm font-medium text-slate-700">
            {data?.user.name}
          </span>
          <ChevronDown className="size-3.5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
