import { Search } from "lucide-react";
import React, { forwardRef } from "react";

export const Input = forwardRef(
  (
    {
      className,
      ...props
    }: {
      className?: string;
      type?:
        | "email"
        | "number"
        | "password"
        | "search"
        | "tel"
        | "text"
        | "url";
    },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => <input className={` ${className}`} {...props} ref={ref} />,
);

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="size-4 text-slate-350 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-400"
      />
    </div>
  );
}
