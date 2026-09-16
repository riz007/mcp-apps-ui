import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { forwardRef } from "react"
import { cn } from "../../lib/cn"

export type AvatarSize = "sm" | "md" | "lg" | "xl"

export type AvatarProps = {
  /** Describes the person or entity. Also used to derive initials when no image loads. */
  alt: string
  src?: string
  /** Text shown while the image loads or if it fails. Defaults to initials from `alt`. */
  fallback?: string
  /** @default "md" */
  size?: AvatarSize
  className?: string
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: "size-6 text-xs",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-12 text-md",
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : ""
  return (first + last).toUpperCase()
}

/** A person or organisation at a fixed 1:1 ratio. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ alt, src, fallback, size = "md", className }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative inline-flex aspect-square shrink-0 overflow-hidden rounded-full border border-subtle bg-surface align-middle",
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <AvatarPrimitive.Image src={src} alt={alt} className="size-full object-cover" />
      ) : null}
      <AvatarPrimitive.Fallback
        role="img"
        aria-label={alt}
        className="font-medium flex size-full items-center justify-center text-secondary select-none"
      >
        <span aria-hidden>{fallback ?? initials(alt)}</span>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  ),
)
Avatar.displayName = "Avatar"
