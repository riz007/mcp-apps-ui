import * as RadioGroup from "@radix-ui/react-radio-group"
import { forwardRef, useId } from "react"
import { cn } from "../../lib/cn"
import { FieldLabel } from "../../lib/FieldLabel"
import { useControllableState } from "../../lib/useControllableState"

export type Swatch<T extends string = string> = {
  value: T
  /** Human name for the colour. Announced to assistive technology and shown when selected. */
  name: string
  /** Any CSS colour. This is brand or content colour, not UI chrome. */
  color: string
  disabled?: boolean
}

export type SwatchRowProps<T extends string = string> = {
  label: string
  hideLabel?: boolean
  swatches: Swatch<T>[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  disabled?: boolean
  name?: string
  className?: string
}

const SwatchRowBase = forwardRef<HTMLDivElement, SwatchRowProps>(
  (
    {
      label,
      hideLabel = false,
      swatches,
      value: valueProp,
      defaultValue,
      onChange,
      disabled,
      name,
      className,
    },
    ref,
  ) => {
    const labelId = useId()
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValue ?? swatches[0]?.value ?? "",
      onChange,
    })
    const selected = swatches.find((swatch) => swatch.value === value)

    return (
      <div ref={ref} className={cn("gap-2 flex flex-col", className)}>
        <FieldLabel
          id={labelId}
          hidden={hideLabel}
          aside={
            selected ? (
              <span className="text-sm text-primary" aria-hidden>
                {selected.name}
              </span>
            ) : null
          }
        >
          {label}
        </FieldLabel>
        <RadioGroup.Root
          aria-labelledby={labelId}
          value={value}
          onValueChange={setValue}
          disabled={disabled}
          name={name}
          orientation="horizontal"
          className="gap-1 flex flex-wrap"
        >
          {swatches.map((swatch) => (
            <RadioGroup.Item
              key={swatch.value}
              value={swatch.value}
              disabled={swatch.disabled}
              aria-label={swatch.name}
              className={cn(
                "group size-11 grid cursor-pointer place-items-center rounded-full border-2 border-transparent focus-ring transition-colors",
                "hover:border-subtle data-[state=checked]:border-accent",
                "disabled:cursor-not-allowed disabled:opacity-40",
              )}
            >
              <span
                className="size-8 block rounded-full shadow-[inset_0_0_0_1px_var(--mcp-border-primary)]"
                style={{ backgroundColor: swatch.color }}
              />
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>
    )
  },
)
SwatchRowBase.displayName = "SwatchRow"

/**
 * Choose a colour from a fixed palette. Replaces a colour picker, which would
 * open a layer above the host.
 */
export const SwatchRow = SwatchRowBase as <T extends string = string>(
  props: SwatchRowProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement
