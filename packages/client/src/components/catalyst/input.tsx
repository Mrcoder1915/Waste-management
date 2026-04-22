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
