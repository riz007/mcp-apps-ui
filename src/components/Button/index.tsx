import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export type ButtonVariant = "solid" | "soft" | "ghost"
export type ButtonColor = "primary" | "secondary" | "danger"
export type ButtonSize = "sm" | "md"

export type ButtonStyleProps = {
  /** @default "solid" */
  variant?: ButtonVariant
  /** @default "primary" */
  color?: ButtonColor
  /** Both sizes keep a 44px minimum hit area. @default "md" */
  size?: ButtonSize
  /** Stretch to the full width of the container. */
  block?: boolean
}

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> &
  ButtonStyleProps & {
    /** Render the single child element with button styles instead of a `<button>`. */
    asChild?: boolean
  }

const colorClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    primary: "bg-accent text-accent-contrast hover:opacity-90 active:opacity-80",
    secondary:
      "border border-default bg-canvas text-primary hover:bg-surface active:bg-surface-tertiary",
    danger: "bg-danger-strong text-inverse hover:opacity-90 active:opacity-80",
  },
  soft: {
    primary: "bg-accent/15 text-primary hover:bg-accent/20 active:bg-accent/25",
    secondary:
      "bg-inverse/8 text-secondary hover:bg-inverse/12 hover:text-primary active:bg-inverse/16",
    danger: "bg-danger text-danger hover:opacity-90 active:opacity-80",
  },
  ghost: {
    primary: "bg-transparent text-primary hover:bg-inverse/8 active:bg-inverse/12",
    secondary: "bg-transparent text-secondary hover:bg-inverse/8 hover:text-primary",
    danger: "bg-transparent text-danger hover:bg-danger",
  },
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 gap-1.5 px-3 text-sm [&_svg]:size-4",
  md: "min-h-12 gap-2 px-4 text-md [&_svg]:size-5",
}

export function buttonClasses({
  variant = "solid",
  color = "primary",
  size = "md",
  block = false,
}: ButtonStyleProps = {}) {
  return cn(
    "min-w-11 font-semibold inline-flex cursor-pointer items-center justify-center rounded-md whitespace-nowrap no-underline focus-ring transition-[background-color,color,opacity] select-none",
    "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled disabled:opacity-100",
    "aria-disabled:cursor-not-allowed aria-disabled:border-disabled aria-disabled:bg-disabled aria-disabled:text-disabled aria-disabled:opacity-100",
    sizeClasses[size],
    colorClasses[variant][color],
    block ? "flex w-full" : null,
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, color, size, block, asChild = false, className, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonClasses({ variant, color, size, block }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"
