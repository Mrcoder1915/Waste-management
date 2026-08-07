import { ReactNode } from "react";

interface TableProps {
  columns: string[];
  children: ReactNode;
}

export function Table({ columns, children }: TableProps) {
  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400 border-y border-slate-100">
            {columns.map((c) => (
              <th key={c} className="py-2.5 px-5 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
