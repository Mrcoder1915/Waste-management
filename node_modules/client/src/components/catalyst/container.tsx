import  { ComponentProps } from "react";

export const Container = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={`overflow-hidden m-auto flex flex-col items-center justify-center ${className}`}
      {...props}
    />
  );
};

export const EmblaContainer = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={`w-full flex ${className}`} {...props} />
  )
};

export const Image = ({
  className,
  ...props
}: ComponentProps<"img">) => {
  return (
    <img
      className={`w-full h-full object-contain ${className}`}
      {...props}
      alt={props.alt || ""}
    />
  );
};
