import { forwardRef, type ReactNode, type SVGProps } from "react"
import { cn } from "../../lib/cn"

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Accessible name. Leave empty for decorative icons next to visible text. */
  title?: string
}

export function createIcon(displayName: string, paths: ReactNode) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(({ title, className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {paths}
    </svg>
  ))
  Icon.displayName = displayName
  return Icon
}
