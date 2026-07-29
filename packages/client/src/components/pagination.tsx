import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "../lib/cx";
import { IconAction } from "./catalyst/icon";

interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, total, onChange }: PaginationProps) {
  const pages: Array<number | "..."> = [1, 2, 3, "...", total];
  return (
    <div className="flex items-center gap-1.5 justify-end">
      <IconAction onClick={() => onChange(Math.max(1, page - 1))}>
        <ChevronLeft className="size-4" />
      </IconAction>
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="size-8 flex items-center justify-center text-slate-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cx(
              "size-8 rounded-lg text-xs font-semibold transition-colors",
              page === p
                ? "bg-emerald-600 text-white"
                : "text-slate-500 hover:bg-slate-100",
            )}
          >
            {p}
          </button>
        ),
      )}
      <IconAction onClick={() => onChange(Math.min(total, page + 1))}>
        <ChevronRight className="size-4" />
      </IconAction>
    </div>
  );
}
