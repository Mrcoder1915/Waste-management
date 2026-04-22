import { ComponentProps } from "react";

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
