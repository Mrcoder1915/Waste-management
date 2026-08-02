import { Search } from "lucide-react";
import React, { forwardRef } from "react";
import { cx } from "../../lib/cx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cx(
          // 1. Base Layout & Box Model
          "flex h-15 lg:h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 lg:text-sm mb-2",

          "text-slate-900 placeholder:text-slate-400",

          "transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30",

          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",

          "file:border-0 file:bg-transparent file:text-sm file:font-medium",

          // Merge custom classes passed from the parent
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
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

export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cx("block text-sm font-medium text-slate-700 mb-2")}
      {...props}
    >
      {children}
    </label>
  );
}
