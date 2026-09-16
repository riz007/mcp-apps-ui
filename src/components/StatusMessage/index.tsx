import { forwardRef, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "../../lib/cn"
import type { Tone } from "../../lib/types"
import { Danger, Info, Success, Warning } from "../Icon"

export type StatusMessageProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  /** @default "neutral" */
  tone?: Tone
  title?: ReactNode
  /** Replace the tone icon, or pass `null` to remove it. */
  icon?: ReactNode
}

const toneClasses: Record<Tone, { box: string; icon: string }> = {
  neutral: { box: "border-subtle bg-surface", icon: "text-secondary" },
  info: { box: "border-info bg-info", icon: "text-info" },
  success: { box: "border-success bg-success", icon: "text-success" },
  warning: { box: "border-warning bg-warning", icon: "text-warning" },
  danger: { box: "border-danger bg-danger", icon: "text-danger" },
}

const toneIcons: Record<Tone, ReactNode> = {
  neutral: <Info />,
  info: <Info />,
  success: <Success />,
  warning: <Warning />,
  danger: <Danger />,
}

/** A polite, non-blocking update about what just happened. */
export const StatusMessage = forwardRef<HTMLDivElement, StatusMessageProps>(
  ({ tone = "neutral", title, icon, className, children, ...props }, ref) => {
    const resolvedIcon = icon === undefined ? toneIcons[tone] : icon

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "gap-2.5 px-3 py-2.5 flex w-full rounded-md border text-sm text-primary",
          toneClasses[tone].box,
          className,
        )}
        {...props}
      >
        {resolvedIcon ? (
          <span className={cn("[&_svg]:size-4.5 mt-px shrink-0", toneClasses[tone].icon)}>
            {resolvedIcon}
          </span>
        ) : null}
        <div className="min-w-0 gap-0.5 flex flex-col">
          {title ? <p className="font-semibold">{title}</p> : null}
          {children ? <div className="text-secondary">{children}</div> : null}
        </div>
      </div>
    )
  },
)
StatusMessage.displayName = "StatusMessage"
