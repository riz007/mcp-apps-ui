import { forwardRef, type AnchorHTMLAttributes } from "react"
import { cn } from "../../lib/cn"
import { buttonClasses, type ButtonStyleProps } from "../Button"
import { ExternalLink } from "../Icon"

export type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color"> &
  ButtonStyleProps & {
    href: string
    /** Opens in a new browsing context and appends an external-link icon. */
    external?: boolean
  }

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant, color, size, block, external = false, className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(buttonClasses({ variant, color, size, block }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...props}
    >
      {children}
      {external ? (
        <>
          <ExternalLink />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : null}
    </a>
  ),
)
ButtonLink.displayName = "ButtonLink"
