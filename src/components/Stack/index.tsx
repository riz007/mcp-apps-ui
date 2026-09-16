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

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  /** Steps on the spacing scale. @default 3 */
  gap?: Gap
  /** @default "stretch" */
  align?: Align
  justify?: Justify
  asChild?: boolean
}

/** Vertical flow with consistent gaps. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ gap = 3, align = "stretch", justify, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(
          "min-w-0 flex flex-col",
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
Stack.displayName = "Stack"
