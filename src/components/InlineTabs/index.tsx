import * as Tabs from "@radix-ui/react-tabs"
import { forwardRef, type ReactNode } from "react"
import { cn } from "../../lib/cn"
import { useControllableState } from "../../lib/useControllableState"

export type InlineTab<T extends string = string> = {
  value: T
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export type InlineTabsProps<T extends string = string> = {
  /** Names the tab list for assistive technology. */
  label: string
  tabs: InlineTab<T>[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  className?: string
}

const InlineTabsBase = forwardRef<HTMLDivElement, InlineTabsProps>(
  ({ label, tabs, value: valueProp, defaultValue, onChange, className }, ref) => {
    const [value, setValue] = useControllableState({
      value: valueProp,
      defaultValue: defaultValue ?? tabs[0]?.value ?? "",
      onChange,
    })

    return (
      <Tabs.Root
        ref={ref}
        value={value}
        onValueChange={setValue}
        activationMode="automatic"
        className={cn("gap-3 flex flex-col", className)}
      >
        <Tabs.List aria-label={label} className="gap-x-1 flex flex-wrap border-b border-subtle">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className={cn(
                "min-h-11 min-w-11 gap-1.5 px-3 font-medium [&_svg]:size-4 -mb-px inline-flex cursor-pointer items-center rounded-t-sm border-b-2 border-transparent text-sm text-secondary focus-ring transition-colors",
                "hover:text-primary data-[state=active]:border-accent data-[state=active]:text-primary",
                "disabled:cursor-not-allowed disabled:text-disabled",
              )}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value} className="rounded-sm focus-ring">
            {tab.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    )
  },
)
InlineTabsBase.displayName = "InlineTabs"

/**
 * Switch between views of the same subject in place. Not for navigating to a
 * different context; that belongs in the conversation.
 */
export const InlineTabs = InlineTabsBase as <T extends string = string>(
  props: InlineTabsProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement
