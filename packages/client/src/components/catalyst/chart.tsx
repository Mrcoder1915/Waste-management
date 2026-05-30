import { ComponentProps } from "react";
import { clsx } from "clsx";

export const ChartContainer = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={clsx(
        `p-6 flex flex-col min-h-92 h-auto bg-white rounded-2xl shadow-2xl relative`,
        className,
      )}
      {...props}
    />
  );
};
