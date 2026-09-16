import { forwardRef } from "react"
import { StateLayout, type StateLayoutProps } from "../../lib/StateLayout"
import { Search } from "../Icon"

export type EmptyStateProps = Omit<StateLayoutProps, "iconClassName">

/** Explain that there is nothing to show yet, and offer one way forward. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon = <Search />, ...props }, ref) => (
    <StateLayout ref={ref} icon={icon} iconClassName="text-secondary" {...props} />
  ),
)
EmptyState.displayName = "EmptyState"
