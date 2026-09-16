import * as SwitchPrimitive from "@radix-ui/react-switch"
import { forwardRef, useId, type ReactNode } from "react"
import { cn } from "../../lib/cn"

export type SwitchProps = {
  label: ReactNode
  /** Keep the label for assistive technology only. */
  hideLabel?: boolean
  description?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  name?: string
  value?: string
  className?: string
}

/** An on/off setting that takes effect immediately. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      label,
      hideLabel = false,
      description,
      checked,
      defaultChecked,
      onChange,
      disabled,
      name,
      value,
      className,
    },
    ref,
  ) => {
    const id = useId()
    const descriptionId = description ? `${id}-description` : undefined

    return (
      <div className={cn("min-h-11 gap-3 flex items-center justify-between", className)}>
        <div className={cn("min-w-0 flex flex-col", hideLabel && "sr-only")}>
          <label
            htmlFor={id}
            className={cn("text-md text-primary", disabled ? "text-disabled" : "cursor-pointer")}
          >
            {label}
          </label>
          {description ? (
            <span id={descriptionId} className="text-sm text-tertiary">
              {description}
            </span>
          ) : null}
        </div>
        <SwitchPrimitive.Root
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
          aria-describedby={descriptionId}
          className="group -mx-1.5 h-11 w-14 inline-flex shrink-0 cursor-pointer items-center justify-center outline-none disabled:cursor-not-allowed"
        >
          <span
            className={cn(
              "h-6 w-11 p-0.5 relative flex items-center rounded-full border border-default bg-inverse/10 transition-colors",
              "group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-ring",
              "group-data-[state=checked]:border-accent group-data-[state=checked]:bg-accent",
              "group-disabled:border-disabled group-disabled:bg-disabled",
            )}
          >
            <SwitchPrimitive.Thumb
              className={cn(
                "size-5 shadow-sm block rounded-full bg-canvas transition-transform",
                "data-[state=checked]:translate-x-5 data-[state=checked]:bg-[var(--mcp-accent-contrast)]",
                "motion-reduce:transition-none",
              )}
            />
          </span>
        </SwitchPrimitive.Root>
      </div>
    )
  },
)
Switch.displayName = "Switch"
