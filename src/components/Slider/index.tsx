import * as SliderPrimitive from "@radix-ui/react-slider"
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from "react"
import { cn } from "../../lib/cn"
import { FieldLabel } from "../../lib/FieldLabel"
import { useDebouncedCallback } from "../../lib/useDebouncedCallback"

export type SliderProps = {
  label: string
  hideLabel?: boolean
  value?: number
  defaultValue?: number
  /** Called after the thumb has rested for `debounceMs`, and immediately on release. */
  onChange?: (value: number) => void
  /** @default 150 */
  debounceMs?: number
  /** @default 0 */
  min?: number
  /** @default 100 */
  max?: number
  /** @default 1 */
  step?: number
  /** Show the current value beside the label. @default true */
  showValue?: boolean
  formatValue?: (value: number) => string
  disabled?: boolean
  name?: string
  className?: string
}

/** Fine-tune a number within a range. */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      label,
      hideLabel = false,
      value: valueProp,
      defaultValue,
      onChange,
      debounceMs = 150,
      min = 0,
      max = 100,
      step = 1,
      showValue = true,
      formatValue = String,
      disabled,
      name,
      className,
    },
    ref,
  ) => {
    const labelId = useId()
    const [local, setLocal] = useState(valueProp ?? defaultValue ?? min)
    const lastSent = useRef<number | undefined>(valueProp ?? defaultValue)

    const send = useCallback(
      (next: number) => {
        if (lastSent.current === next) return
        lastSent.current = next
        onChange?.(next)
      },
      [onChange],
    )
    const [emit, flush] = useDebouncedCallback(send, debounceMs)

    useEffect(() => {
      if (valueProp === undefined) return
      setLocal(valueProp)
      lastSent.current = valueProp
    }, [valueProp])

    const text = formatValue(local)

    return (
      <div ref={ref} className={cn("gap-1 flex flex-col", className)}>
        <FieldLabel
          id={labelId}
          hidden={hideLabel}
          aside={
            showValue ? (
              <span className="text-sm text-primary tabular-nums" aria-hidden>
                {text}
              </span>
            ) : null
          }
        >
          {label}
        </FieldLabel>
        <SliderPrimitive.Root
          value={[local]}
          min={min}
          max={max}
          step={step}
          name={name}
          disabled={disabled}
          onValueChange={([next = min]) => {
            setLocal(next)
            emit(next)
          }}
          onValueCommit={([next = min]) => {
            emit(next)
            flush()
          }}
          className="h-11 relative flex w-full touch-none items-center select-none data-[disabled]:cursor-not-allowed"
        >
          <SliderPrimitive.Track className="h-1 relative grow overflow-hidden rounded-full bg-inverse/15">
            <SliderPrimitive.Range className="absolute h-full bg-accent data-[disabled]:bg-disabled" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            aria-labelledby={labelId}
            aria-valuetext={text}
            className={cn(
              "group size-11 grid cursor-grab place-items-center rounded-full outline-none active:cursor-grabbing",
              "data-[disabled]:cursor-not-allowed",
            )}
          >
            <span
              className={cn(
                "size-5 shadow-sm block rounded-full border border-default bg-canvas",
                "group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-ring",
                "group-data-[disabled]:bg-disabled",
              )}
            />
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>
    )
  },
)
Slider.displayName = "Slider"
