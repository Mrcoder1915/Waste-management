import { ComponentProps } from "react";
import clsx from "clsx";

export const Heading = ({ className, ...props }: ComponentProps<"h1">) => {
  return <h1 className={clsx("", className)} {...props} />;
};

export const Subheading = ({ className, ...props }: ComponentProps<"h2">) => {
  return <h2 className={clsx("", className)} {...props} />;
};

export const paragraph = ({ className, ...props }: ComponentProps<"p">) => {
  return <p className={clsx("", className)} {...props} />;
};
