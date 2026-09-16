import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "../../lib/cn"
import {
  alignClasses,
  gapClasses,
  justifyClasses,
  type Align,
  type Gap,
  type Justify,
} from "../../lib/layout"

export type RowProps = HTMLAttributes<HTMLDivElement> & {
  /** Steps on the spacing scale. @default 2 */
  gap?: Gap
  /** @default "center" */
  align?: Align
  justify?: Justify
  /** Wrap onto new lines instead of overflowing. @default true */
  wrap?: boolean
  asChild?: boolean
}

/** Horizontal flow that wraps by default, so it never forces a horizontal scroll. */
export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    { gap = 2, align = "center", justify, wrap = true, asChild = false, className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(
          "min-w-0 flex flex-row",
          wrap ? "flex-wrap" : "flex-nowrap",
          gapClasses[gap],
          alignClasses[align],
          justify && justifyClasses[justify],
          className,
        )}
        {...props}
      />
    )
  },
)
Row.displayName = "Row"
