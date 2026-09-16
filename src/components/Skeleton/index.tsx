import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  /** @default "text" */
  variant?: "text" | "block" | "circle"
  /** For `text`, render several lines with a shorter last line. @default 1 */
  lines?: number
}

const base = "animate-pulse bg-inverse/10 motion-reduce:animate-none"

/**
 * Placeholder shapes shown while content loads. Compose them to mirror the
 * final layout. Mark the loading region with `aria-busy` on its container.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", lines = 1, className, ...props }, ref) => {
    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          aria-hidden
          className={cn("gap-2 flex w-full flex-col", className)}
          {...props}
        >
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={cn(
                base,
                "max-h-4 h-[1lh] rounded-xs",
                index === lines - 1 ? "w-3/5" : "w-full",
              )}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          base,
          variant === "text" && "max-h-4 h-[1lh] w-full rounded-xs",
          variant === "block" && "h-24 w-full rounded-md",
          variant === "circle" && "size-10 aspect-square rounded-full",
          className,
        )}
        {...props}
      />
    )
  },
)
Skeleton.displayName = "Skeleton"
