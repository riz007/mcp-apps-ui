import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { forwardRef } from "react"
import { cn } from "../../lib/cn"

export type SeparatorProps = {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical"
  /** Purely visual separators are hidden from assistive technology. @default true */
  decorative?: boolean
  className?: string
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", decorative = true, className }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "shrink-0 border-subtle",
        orientation === "horizontal" ? "h-0 w-full border-t" : "w-0 self-stretch border-l",
        className,
      )}
    />
  ),
)
Separator.displayName = "Separator"
