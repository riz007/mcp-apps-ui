import { forwardRef } from "react"
import { StateLayout, type StateLayoutProps } from "../../lib/StateLayout"
import { Danger } from "../Icon"

export type ErrorStateProps = Omit<StateLayoutProps, "iconClassName">

/** Say what went wrong in plain words, and offer one way to recover. */
export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ icon = <Danger />, ...props }, ref) => (
    <StateLayout
      ref={ref}
      role="alert"
      icon={icon}
      iconClassName="bg-danger text-danger"
      {...props}
    />
  ),
)
ErrorState.displayName = "ErrorState"
