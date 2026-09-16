# mcp-apps-ui

**A lightweight, accessible React component library for building MCP Apps that render inside Claude.**

Tailwind-integrated design tokens that map to Claude's host-injected style variables, a curated component set built for the MCP Apps design guidelines, and no floating UI — because the guidelines forbid it.

```bash
npm install mcp-apps-ui
```

> **Not affiliated with, endorsed by, or sponsored by Anthropic PBC.** "Claude" and "Anthropic" are trademarks of Anthropic PBC. This is an independent open-source project built against publicly documented specifications.

---

## Why

`@openai/apps-sdk-ui` gives ChatGPT app developers a design system. Claude has published tokens, a Figma kit and design guidelines, but no code. This fills that gap, with the same shape and the same ergonomics.

The reason it can't just be a fork: the MCP Apps design guidelines forbid dropdowns, context menus, popover panels and floating panels, because they get clipped by container boundaries or conflict with the host's z-index. Every mainstream React library — Radix, shadcn/ui, MUI, Mantine — is built around floating layers. This one isn't.

## Prerequisites

React 18 or 19, and Tailwind 4.

## Install

**1. Install**

```bash
npm install mcp-apps-ui
```

**2. Set up styles**

```css
@import "tailwindcss";
@import "mcp-apps-ui/css";
/* Required for Tailwind to find class references in mcp-apps-ui components. */
@source "../node_modules/mcp-apps-ui";

/* The rest of your application CSS */
```

Import your stylesheet before rendering anything:

```tsx
import "./main.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**3. Build**

```tsx
import { useState } from "react"
import { Badge } from "mcp-apps-ui/components/Badge"
import { Button } from "mcp-apps-ui/components/Button"
import { DataList } from "mcp-apps-ui/components/DataList"
import { SegmentedControl } from "mcp-apps-ui/components/SegmentedControl"
import { Calendar, Members } from "mcp-apps-ui/components/Icon"

export function BookingCard() {
  const [seating, setSeating] = useState<"indoor" | "patio">("indoor")

  return (
    <div className="@container flex w-full flex-col gap-4 rounded-lg border border-default bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="heading-md">La Luna Bistro</h2>
        <Badge color="success">Confirmed</Badge>
      </div>

      <DataList
        items={[
          { icon: <Calendar />, label: "Date", value: "Apr 12 · 7:30 PM" },
          { icon: <Members />, label: "Guests", value: "Party of 2" },
        ]}
      />

      <SegmentedControl
        label="Seating"
        options={[
          { value: "indoor", label: "Indoor" },
          { value: "patio", label: "Patio" },
        ]}
        value={seating}
        onChange={setSeating}
      />

      <div className="grid gap-3 border-t border-subtle pt-4 @xs:grid-cols-2">
        <Button variant="soft" color="secondary" block>
          Call
        </Button>
        <Button color="primary" block>
          Directions
        </Button>
      </div>
    </div>
  )
}
```

Everything is also exported from the package root, but per-component paths keep the bundle small when your app is inlined into a single HTML resource.

## Host styles and theme

Your app runs in a sandboxed frame, so it can't inherit Claude's CSS. The host sends style variables and the current theme over the MCP Apps bridge, and your app applies them. Until `mcp-apps-ui/bridge` exists, use the official SDK:

```ts
import {
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
} from "@modelcontextprotocol/ext-apps"

app.onhostcontextchanged = (ctx) => {
  if (ctx.theme) applyDocumentTheme(ctx.theme)
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables)
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts)
}
```

`applyDocumentTheme` sets `data-theme` on `<html>`. The token fallbacks and Tailwind's `dark:` variant both key off that attribute, not the operating system.

## Documentation

Storybook with every component, the token reference and complete card patterns: **https://riz007.github.io/mcp-apps-ui/**

Its toolbar switches theme, container width (320px up), host text size, and whether tokens come from a simulated Claude host or no host at all.

## Components

**Controls** — `Button` · `ButtonLink` · `SegmentedControl` · `ToggleChips` · `InlineTabs` · `Switch` · `Slider` · `Stepper` · `SwatchRow` · `TextLink`

**Display** — `Badge` · `DataList` · `Avatar` · `Thumbnail` · `Separator` · `Icon`

**States** — `Skeleton` · `StatusMessage` · `EmptyState` · `ErrorState`

**Layout** — `Stack` · `Row` · `Scroller` (horizontal only)

Every control is keyboard navigable, has a visible focus ring from `--color-ring-primary`, and meets the 44×44pt minimum tap target. Links inside running text (`TextLink`) are the one exemption; use `ButtonLink` for standalone actions.

## Deliberately absent

No `Dropdown`, `Select`, `Popover`, `Tooltip`, `ContextMenu`, `Modal`, `Drawer`, or anything else that floats above the layout. No chat input. No router.

These aren't gaps. The guidelines forbid floating layers, and recommend visible controls — segmented buttons, toggle chips, inline tabs — instead. If you need a menu, you need a `SegmentedControl` or a fullscreen view.

`Skeleton` has no spinner variant, for the same reason: the guidelines call for skeleton screens over spinners in inline content.

## Tokens

The library consumes Claude's host-injected CSS custom properties and exposes them as Tailwind utilities. It defines no colours of its own.

| Utility          | Token                                  |
| ---------------- | -------------------------------------- |
| `bg-surface`     | `--color-background-secondary`         |
| `bg-canvas`      | `--color-background-primary`           |
| `text-primary`   | `--color-text-primary`                 |
| `text-secondary` | `--color-text-secondary`               |
| `border-default` | `--color-border-primary`               |
| `border-subtle`  | `--color-border-tertiary`              |
| `heading-md`     | `--font-heading-md-size` + line height |
| `rounded-md`     | `--border-radius-md`                   |

Full mapping in the docs. Fallbacks exist for hosts that inject a partial set; don't rely on them.

Tailwind's default colour palette is removed, so `bg-white` or `text-gray-500` won't compile into your app by accident.

Brand expression is allowed on accents and identity. Structural elements — backgrounds, text, borders, icons — use host tokens. Set `--mcp-accent` to colour primary buttons and selection states.

## Fonts

None bundled. Claude supplies Anthropic Sans at runtime through style variables; use `font-sans`. For local development, download the fonts from [Anthropic's brand site](https://brand.anthropic.com/typography) under their terms. They are not redistributed here.

## Design sources

| Source                                                                                                             | Status                                                   |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| [MCP Apps design guidelines](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines)               | **Normative.** Every constraint and token name.          |
| [MCP Apps for Claude — Figma UI kit](https://www.figma.com/community/file/1597641111449594397/mcp-apps-for-claude) | Visual reference for composition and interaction states. |
| [`@openai/apps-sdk-ui`](https://github.com/openai/apps-sdk-ui)                                                     | Prior art for structure and API shape.                   |
| [shadcn.io Anthropic DESIGN.md](https://www.shadcn.io/design/anthropic)                                            | **Storybook fallback theme only.**                       |

That last row is worth reading carefully. The shadcn.io file is a community-curated capture of **anthropic.com's marketing brand** — ivory canvas, slate ink, serif body, the dormant clay/fig/cactus accents. It is not the MCP Apps token set: inside a host, `color-background-primary` is `#FFFFFF` in light and `#30302E` in dark. We use the marketing palette in exactly one place, the Storybook fallback theme where no host exists to inherit from, and never in shipped component CSS.

## Conformance

Each release records the date the guidelines were last verified, in [CONFORMANCE.md](./CONFORMANCE.md). The page changes without a changelog.

**Current baseline: guidelines as retrieved 2026-09-16.**

## Roadmap

- **v0.1** — tokens, Tailwind preset, components above, Storybook, icons
- **v0.2** — `mcp-apps-ui/bridge`: provider and hooks for the `ui/*` handshake, host context, safe-area insets, display modes
- **v0.3** — charts themed to the semantic tokens; ChatGPT token mapping
- **v0.4** — ESLint plugin enforcing the checkable constraints (two actions, five data points, 44pt targets, no fixed widths)
- **1.0** — after a reference app clears the Claude connectors directory

## Contributing

Two rules. A component that can't satisfy the guidelines doesn't get merged — open an issue before building anything that floats. And every component needs a Storybook story in both themes.

```bash
npm install
npx playwright install chromium
npm run dev            # Storybook on :6006
npm run lint && npm run types && npm test && npm run test:stories
```

`test:stories` renders every story in light and dark at 320px and fails on axe violations, tap targets under 44×44, or horizontal overflow.

See [AGENTS.md](./AGENTS.md) for conventions.

## Licence

MIT.
