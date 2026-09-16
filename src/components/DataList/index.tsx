import { forwardRef, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "../../lib/cn"
import { devWarning } from "../../lib/warn"

export type DataListItem = {
  label: ReactNode
  value: ReactNode
  icon?: ReactNode
}

export type DataListProps = Omit<HTMLAttributes<HTMLDListElement>, "children"> & {
  items: DataListItem[]
  /** Where values sit when there is room beside the label. @default "end" */
  align?: "start" | "end"
  /** Draw a hairline between rows. */
  dividers?: boolean
}

export const MAX_INLINE_DATA_POINTS = 5

/**
 * Label and value pairs. Inline cards should show four or five at most; a
 * development warning fires past five. Rows stack when the container is
 * narrower than 320px.
 */
export const DataList = forwardRef<HTMLDListElement, DataListProps>(
  ({ items, align = "end", dividers = false, className, ...props }, ref) => {
    if (items.length > MAX_INLINE_DATA_POINTS) {
      devWarning(
        "data-list-length",
        `DataList received ${items.length} items. Inline cards should show at most ${MAX_INLINE_DATA_POINTS} data points; move the rest to a fullscreen view.`,
      )
    }

    return (
      <dl
        ref={ref}
        className={cn(
          "@container flex w-full flex-col text-sm",
          dividers ? "divide-y divide-subtle" : "gap-2",
          className,
        )}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "gap-0.5 @min-[20rem]:gap-3 flex flex-col @min-[20rem]:flex-row @min-[20rem]:items-baseline",
              align === "end" && "@min-[20rem]:justify-between",
              dividers && "py-2",
            )}
          >
            <dt className="gap-1.5 [&_svg]:size-4 flex shrink-0 items-center text-secondary [&_svg]:self-center">
              {item.icon}
              {item.label}
            </dt>
            <dd
              className={cn(
                "min-w-0 font-medium break-words text-primary",
                align === "end" && "@min-[20rem]:text-right",
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    )
  },
)
DataList.displayName = "DataList"
