import { forwardRef, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "./cn"

export type StateLayoutProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  /** One recovery action at most, such as a single `Button`. */
  action?: ReactNode
  iconClassName?: string
}

export const StateLayout = forwardRef<HTMLDivElement, StateLayoutProps>(
  ({ title, description, icon, action, iconClassName, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("gap-3 px-4 py-6 flex w-full flex-col items-center text-center", className)}
      {...props}
    >
      {icon ? (
        <span
          className={cn(
            "size-10 [&_svg]:size-5 grid place-items-center rounded-full bg-surface",
            iconClassName,
          )}
        >
          {icon}
        </span>
      ) : null}
      <div className="max-w-prose gap-1 flex flex-col">
        <p className="heading-sm text-primary">{title}</p>
        {description ? <p className="text-sm text-secondary">{description}</p> : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  ),
)
StateLayout.displayName = "StateLayout"
