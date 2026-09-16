import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type AnchorHTMLAttributes } from "react"
import { cn } from "../../lib/cn"
import { ExternalLink } from "../Icon"

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Opens in a new browsing context and appends an external-link icon. Ignored with `asChild`. */
  external?: boolean
  /** Render the single child element with link styles, e.g. a router link. */
  asChild?: boolean
}

/**
 * A link inside running text. Inline links are exempt from the 44px target
 * size; for a standalone action use `ButtonLink`.
 */
export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ external = false, asChild = false, className, children, ...props }, ref) => {
    const isExternal = external && !asChild
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        data-inline-target=""
        className={cn(
          "font-medium rounded-xs text-primary underline decoration-current/40 decoration-1 underline-offset-[0.2em] focus-ring transition-[text-decoration-color] hover:decoration-current",
          isExternal && "gap-0.5 inline-flex items-baseline",
          className,
        )}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        {...props}
      >
        {isExternal ? (
          <>
            {children}
            <ExternalLink className="size-[0.9em] self-center" />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
TextLink.displayName = "TextLink"
