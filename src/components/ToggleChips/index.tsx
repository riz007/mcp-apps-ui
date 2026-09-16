import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { forwardRef, useId } from "react"
import { cn } from "../../lib/cn"
import { FieldLabel } from "../../lib/FieldLabel"
import type { Option } from "../../lib/types"
import { useControllableState } from "../../lib/useControllableState"
import { Check } from "../Icon"

export type ToggleChipsProps<T extends string = string> = {
  /** Names the group for assistive technology. Shown above the chips unless `hideLabel`. */
  label: string
  hideLabel?: boolean
  options: Option<T>[]
  value?: T[]
  defaultValue?: T[]
  onChange?: (value: T[]) => void
  disabled?: boolean
  className?: string
}

const ToggleChipsBase = forwardRef<HTMLDivElement, ToggleChipsProps>(
  (
    {
      label,
      hideLabel = false,
      options,
      value: valueProp,
      defaultValue = [],
      onChange,
      disabled,
      className,
    },
    ref,
  ) => {
    const labelId = useId()
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue,
      onChange,
    })

    return (
      <div ref={ref} className={cn("gap-2 flex flex-col", className)}>
        <FieldLabel id={labelId} hidden={hideLabel}>
          {label}
        </FieldLabel>
        <ToggleGroup.Root
          type="multiple"
          aria-labelledby={labelId}
          value={value}
          onValueChange={setValue}
          disabled={disabled}
          className="gap-2 flex flex-wrap"
        >
          {options.map((option) => {
            const selected = value.includes(option.value)
            return (
              <ToggleGroup.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn(
                  "min-h-11 min-w-11 gap-1.5 px-4 font-medium inline-flex cursor-pointer items-center justify-center rounded-full border border-default text-sm text-primary focus-ring transition-colors",
                  "hover:bg-inverse/8 data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-accent-contrast",
                  "disabled:cursor-not-allowed disabled:border-disabled disabled:text-disabled",
                )}
              >
                {selected ? <Check className="-ml-1 size-4" /> : null}
                {option.label}
              </ToggleGroup.Item>
            )
          })}
        </ToggleGroup.Root>
      </div>
    )
  },
)
ToggleChipsBase.displayName = "ToggleChips"

/**
 * Select any number of visible options, such as filters. Selected chips gain
 * a check mark so state never relies on colour alone.
 */
export const ToggleChips = ToggleChipsBase as <T extends string = string>(
  props: ToggleChipsProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement
