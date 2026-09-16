import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "../../lib/cn"
import type { Tone } from "../../lib/types"

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  /** @default "neutral" */
  color?: Tone
}

const colorClasses: Record<Tone, string> = {
  neutral: "border-subtle bg-surface text-secondary",
  info: "border-transparent bg-info text-primary",
  success: "border-transparent bg-success text-success",
  warning: "border-transparent bg-warning text-warning",
  danger: "border-transparent bg-danger text-danger",
}

/** A short status label. Pair colour with words; colour alone carries no meaning. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ color = "neutral", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "gap-1 px-2 py-0.5 font-medium [&_svg]:size-3.5 inline-flex w-fit shrink-0 items-center rounded-sm border text-xs whitespace-nowrap",
        colorClasses[color],
        className,
      )}
      {...props}
    />
  ),
)
Badge.displayName = "Badge"
