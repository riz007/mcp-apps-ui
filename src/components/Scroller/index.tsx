import { Children, forwardRef, isValidElement, type HTMLAttributes } from "react"
import { cn } from "../../lib/cn"
import { gapClasses, type Gap } from "../../lib/layout"

export type ScrollerProps = HTMLAttributes<HTMLDivElement> & {
  /** Names the scroll region so keyboard and screen reader users know what it holds. */
  label: string
  /**
   * Width of each item. Keep it below 100% so the next item peeks in.
   * @default "min(80%, 18rem)"
   */
  itemWidth?: string
  /** @default 3 */
  gap?: Gap
  /**
   * Inline scroll padding, e.g. `safeAreaInsets.left` and `.right` from the host
   * context, so items come to rest clear of device edges.
   */
  scrollPaddingInline?: number | string
}

const toLength = (value: number | string) => (typeof value === "number" ? `${value}px` : value)

/**
 * Horizontal, snapping list for carousels. It only ever scrolls sideways; on
 * mobile the conversation owns vertical panning.
 */
export const Scroller = forwardRef<HTMLDivElement, ScrollerProps>(
  (
    {
      label,
      itemWidth = "min(80%, 18rem)",
      gap = 3,
      scrollPaddingInline,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const padding = scrollPaddingInline === undefined ? undefined : toLength(scrollPaddingInline)

    return (
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "flex w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-md focus-ring",
          "pb-1 [scrollbar-width:thin]",
          gapClasses[gap],
          className,
        )}
        style={{ scrollPaddingInline: padding, paddingInline: padding, ...style }}
        {...props}
      >
        {Children.toArray(children).map((child, index) => (
          <div
            key={isValidElement(child) ? child.key : index}
            className="flex shrink-0 snap-start"
            style={{ width: itemWidth }}
          >
            {child}
          </div>
        ))}
      </div>
    )
  },
)
Scroller.displayName = "Scroller"
