import type { ReactNode } from "react"
import { cn } from "./cn"

type FieldLabelProps = {
  id: string
  children: ReactNode
  hidden?: boolean
  aside?: ReactNode
}

export function FieldLabel({ id, children, hidden, aside }: FieldLabelProps) {
  return (
    <div className={cn("gap-3 flex items-baseline justify-between", hidden && "sr-only")}>
      <span id={id} className="font-medium text-sm text-secondary">
        {children}
      </span>
      {aside}
    </div>
  )
}
