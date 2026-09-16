import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { forwardRef, useId } from "react"
import { cn } from "../../lib/cn"
import { FieldLabel } from "../../lib/FieldLabel"
import type { Option } from "../../lib/types"
import { useControllableState } from "../../lib/useControllableState"

export type SegmentedControlProps<T extends string = string> = {
  /** Names the group for assistive technology. Shown above the control unless `hideLabel`. */
  label: string
  hideLabel?: boolean
  options: Option<T>[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  /** @default "md" */
  size?: "sm" | "md"
  /** Stretch segments to fill the container. @default true */
  block?: boolean
  disabled?: boolean
  className?: string
}

const SegmentedControlBase = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      label,
      hideLabel = false,
      options,
      value: valueProp,
      defaultValue,
      onChange,
      size = "md",
      block = true,
      disabled,
      className,
    },
    ref,
  ) => {
    const labelId = useId()
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValue ?? options[0]?.value ?? "",
      onChange,
    })

    return (
      <div ref={ref} className={cn("gap-2 flex flex-col", !block && "items-start", className)}>
        <FieldLabel id={labelId} hidden={hideLabel}>
          {label}
        </FieldLabel>
        <ToggleGroup.Root
          type="single"
          aria-labelledby={labelId}
          value={value}
          onValueChange={(next) => {
            if (next) setValue(next)
          }}
          disabled={disabled}
          className={cn(
            "gap-1 p-1 flex flex-wrap rounded-lg border border-subtle bg-surface",
            block ? "w-full" : "w-fit max-w-full",
          )}
        >
          {options.map((option) => (
            <ToggleGroup.Item
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                "min-h-11 min-w-11 gap-1.5 px-3 font-medium inline-flex cursor-pointer items-center justify-center rounded-md text-secondary focus-ring transition-colors",
                "hover:text-primary data-[state=on]:bg-accent data-[state=on]:text-accent-contrast",
                "disabled:cursor-not-allowed disabled:text-disabled",
                size === "sm" ? "[&_svg]:size-4 text-sm" : "[&_svg]:size-5 text-md",
                block && "flex-1",
              )}
            >
              {option.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    )
  },
)
SegmentedControlBase.displayName = "SegmentedControl"

/**
 * Pick exactly one of a few visible options. Use it wherever a dropdown or
 * select would appear in a web app. Segments wrap onto a second row rather
 * than scroll when space runs out.
 */
export const SegmentedControl = SegmentedControlBase as <T extends string = string>(
  props: SegmentedControlProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement
