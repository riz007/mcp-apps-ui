import { forwardRef, useId, type KeyboardEvent } from "react"
import { cn } from "../../lib/cn"
import { FieldLabel } from "../../lib/FieldLabel"
import { useControllableState } from "../../lib/useControllableState"
import { Minus, Plus } from "../Icon"

export type StepperProps = {
  label: string
  hideLabel?: boolean
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  /** @default 0 */
  min?: number
  max?: number
  /** @default 1 */
  step?: number
  formatValue?: (value: number) => string
  disabled?: boolean
  className?: string
}

/** Adjust a small count, like guests or quantity, one step at a time. */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      label,
      hideLabel = false,
      value: valueProp,
      defaultValue,
      onChange,
      min = 0,
      max,
      step = 1,
      formatValue = String,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const labelId = useId()
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValue ?? min,
      onChange,
    })

    const clamp = (next: number) => Math.min(max ?? Infinity, Math.max(min, next))
    const canDecrement = !disabled && value > min
    const canIncrement = !disabled && (max === undefined || value < max)

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      const actions: Record<string, () => number | undefined> = {
        ArrowUp: () => value + step,
        ArrowRight: () => value + step,
        ArrowDown: () => value - step,
        ArrowLeft: () => value - step,
        PageUp: () => value + step * 10,
        PageDown: () => value - step * 10,
        Home: () => min,
        End: () => max,
      }
      const next = actions[event.key]?.()
      if (next === undefined) return
      event.preventDefault()
      setValue(clamp(next))
    }

    const buttonClass = cn(
      "size-11 [&_svg]:size-5 grid shrink-0 cursor-pointer place-items-center rounded-md text-primary focus-ring transition-colors",
      "hover:bg-inverse/8 disabled:cursor-not-allowed disabled:text-disabled disabled:hover:bg-transparent",
    )

    return (
      <div ref={ref} className={cn("gap-2 flex flex-col", className)}>
        <FieldLabel id={labelId} hidden={hideLabel}>
          {label}
        </FieldLabel>
        <div className="gap-1 p-0.5 inline-flex w-fit items-center rounded-lg border border-default">
          <button
            type="button"
            className={buttonClass}
            onClick={() => setValue(clamp(value - step))}
            disabled={!canDecrement}
            tabIndex={-1}
            aria-label={`Decrease ${label}`}
          >
            <Minus />
          </button>
          <div
            role="spinbutton"
            tabIndex={disabled ? -1 : 0}
            aria-labelledby={labelId}
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={formatValue(value)}
            aria-disabled={disabled || undefined}
            onKeyDown={onKeyDown}
            className={cn(
              "min-w-10 px-1 font-medium rounded-sm text-center text-md tabular-nums focus-ring",
              disabled ? "text-disabled" : "text-primary",
            )}
          >
            {formatValue(value)}
          </div>
          <button
            type="button"
            className={buttonClass}
            onClick={() => setValue(clamp(value + step))}
            disabled={!canIncrement}
            tabIndex={-1}
            aria-label={`Increase ${label}`}
          >
            <Plus />
          </button>
        </div>
      </div>
    )
  },
)
Stepper.displayName = "Stepper"
