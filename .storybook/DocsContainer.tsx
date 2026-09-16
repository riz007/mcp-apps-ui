import {
  DocsContainer as BaseContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks"
import type { PropsWithChildren } from "react"

export function DocsContainer({ children, ...props }: PropsWithChildren<DocsContainerProps>) {
  return (
    <BaseContainer {...props}>
      {children}
      <footer className="docs-footer">
        mcp-apps-ui is an independent open-source project. It is not affiliated with, endorsed by,
        or sponsored by Anthropic PBC. “Claude” and “Anthropic” are trademarks of Anthropic PBC.
      </footer>
    </BaseContainer>
  )
}
