import { ComponentProps } from "react";
import { cx } from "../../lib/cx";

// 1. Semantic Color Dictionary
const textColors = {
  primary: "text-slate-950 dark:text-white", // Highest contrast (Titles/Main focus)
  secondary: "text-slate-700 dark:text-slate-200", // Medium contrast (Subtitles/Labels)
  tertiary: "text-slate-500 dark:text-slate-400", // Lowest contrast (Body text/Captions)
  brand: "text-blue-600 dark:text-blue-400", // Main brand/accent color
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
} as const;

// 2. Extract Types
type TextColor = keyof typeof textColors;

// --- Heading (Defaults to Primary) ---
interface HeadingProps extends ComponentProps<"h1"> {
  color?: TextColor;
}

export const Heading = ({
  className,
  color = "primary",
  ...props
}: HeadingProps) => {
  return (
    <h1
      className={cx(
        "text-3xl font-bold tracking-tight sm:text-4xl",
        textColors[color],
        className,
      )}
      {...props}
    />
  );
};

// --- Subheading (Defaults to Secondary) ---
interface SubheadingProps extends ComponentProps<"h2"> {
  color?: TextColor;
}

export const Subheading = ({
  className,
  color = "secondary",
  ...props
}: SubheadingProps) => {
  return (
    <h2
      className={cx(
        "text-xl font-semibold tracking-tight sm:text-2xl",
        textColors[color],
        className,
      )}
      {...props}
    />
  );
};

// --- Paragraph (Defaults to Tertiary) ---
interface ParagraphProps extends ComponentProps<"p"> {
  color?: TextColor;
}

export const Paragraph = ({
  className,
  color = "tertiary",
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={cx("text-base leading-7", textColors[color], className)}
      {...props}
    />
  );
};
