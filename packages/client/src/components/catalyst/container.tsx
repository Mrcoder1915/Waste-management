import { ComponentProps } from "react";
import clsx from "clsx";

export const Container = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={`w-full lg:overflow-hidden m-auto flex flex-col items-center justify-center z-0 ${className}`}
      {...props}
    />
  );
};

export const ItemContainer = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={clsx(`flex bg-white rounded-2xl shadow-2xl `, className)}
      {...props}
    />
  );
};

export const EmblaContainer = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      {...props}
    />
  );
};

export const Image = ({ className, ...props }: ComponentProps<"img">) => {
  return (
    <img
      className={`w-full h-full object-contain ${className}`}
      {...props}
      alt={props.alt || ""}
    />
  );
};
