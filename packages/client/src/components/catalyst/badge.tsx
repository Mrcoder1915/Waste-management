import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { Tone, TONE_BG, TONE_DOT, TONE_ICON_BG } from "../../lib/tone-style";

type BadgeProps = {
  tone?: Tone;
  children: ReactNode;
  dot?: boolean;
};

type IconBadgeProps = {
  icon: LucideIcon;
  tone: Tone;
};

export function Badge({ tone = "slate", children, dot = false }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        TONE_BG[tone],
      )}
    >
      {dot && <span className={cx("size-1.5 rounded-full", TONE_DOT[tone])} />}
      {children}
    </span>
  );
}

export function IconBadge({ icon: Icon, tone }: IconBadgeProps) {
  return (
    <div
      className={cx(
        "size-11 rounded-xl flex items-center justify-center shrink-0",
        TONE_ICON_BG[tone],
      )}
    >
      <Icon className="size-5" />
    </div>
  );
}
