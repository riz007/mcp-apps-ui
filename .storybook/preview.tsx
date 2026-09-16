import type { Decorator, Preview } from "@storybook/react-vite"
import { useEffect, type ReactNode } from "react"
import { DocsContainer } from "./DocsContainer"
import { applyHost, type Theme } from "./hostStyles"
import "./preview.css"

const widths: Record<string, string | undefined> = {
  "320": "320px",
  "420": "420px",
  "768": "768px",
  full: undefined,
}

type HostFrameProps = {
  theme: Theme
  host: "claude" | "standalone"
  textScale: number
  width: string | undefined
  isStory: boolean
  children: ReactNode
}

function HostFrame({ theme, host, textScale, width, isStory, children }: HostFrameProps) {
  useEffect(() => {
    applyHost(document.documentElement, host, theme, textScale)
    document.body.style.backgroundColor = isStory ? "var(--mcp-bg-primary)" : ""
  }, [host, theme, textScale, isStory])

  return (
    <div
      className="sb-story-frame p-4"
      data-theme={theme}
      style={{ width: width ?? "100%", maxWidth: "100%", boxSizing: "border-box" }}
    >
      {children}
    </div>
  )
}

const withHost: Decorator = (Story, { globals, viewMode }) => (
  <HostFrame
    theme={globals.theme === "dark" ? "dark" : "light"}
    host={globals.host === "standalone" ? "standalone" : "claude"}
    textScale={Number(globals.textScale ?? 1)}
    width={widths[String(globals.width ?? "full")]}
    isStory={viewMode === "story"}
  >
    <Story />
  </HostFrame>
)

const preview: Preview = {
  decorators: [withHost],
  tags: ["autodocs"],
  initialGlobals: {
    theme: import.meta.env.STORY_THEME ?? "light",
    host: "claude",
    width: import.meta.env.STORY_WIDTH ?? "full",
    textScale: "1",
  },
  globalTypes: {
    theme: {
      description: "Colour theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    width: {
      description: "Container width",
      toolbar: {
        title: "Width",
        icon: "grow",
        items: [
          { value: "320", title: "320px (minimum)" },
          { value: "420", title: "420px (inline card)" },
          { value: "768", title: "768px (tablet)" },
          { value: "full", title: "Full width" },
        ],
        dynamicTitle: true,
      },
    },
    textScale: {
      description: "Host text size",
      toolbar: {
        title: "Text size",
        icon: "paragraph",
        items: [
          { value: "1", title: "Text 100%" },
          { value: "1.5", title: "Text 150%" },
          { value: "2", title: "Text 200%" },
        ],
        dynamicTitle: true,
      },
    },
    host: {
      description: "Where tokens come from",
      toolbar: {
        title: "Host",
        icon: "box",
        items: [
          { value: "claude", title: "Claude host (published values)" },
          { value: "standalone", title: "No host (standalone fallback)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    a11y: { test: "error" },
    docs: {
      codePanel: true,
      container: DocsContainer,
    },
    options: {
      storySort: {
        order: [
          "Overview",
          ["Introduction", "Installation", "Constraints", "Conformance"],
          "Foundations",
          "Components",
          ["Controls", "Display", "States", "Layout"],
          "Patterns",
        ],
      },
    },
  },
}

export default preview
