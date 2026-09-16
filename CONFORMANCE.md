# Conformance

Tracks this library against the [MCP Apps design guidelines](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines). The page has no changelog, so every release re-reads it and records the date here.

| | |
| --- | --- |
| **Last verified** | 2026-09-16 |
| **Verified by** | Rizwanul Islam Rudra |
| **Library version** | 0.1.0 |

## Rules

| Rule | Source | How it is enforced |
| --- | --- | --- |
| No dropdowns, context menus, popovers or floating panels | [Patterns to avoid](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#what-makes-a-good-mcp-app), [Visible controls over hidden menus](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#visible-controls-over-hidden-menus) | ESLint `no-restricted-imports` bans floating Radix packages and the `radix-ui` barrel. `src/conformance.test.ts` and `scripts/check-bundle.mjs` scan source and `dist`. |
| No floating panels in fullscreen; disclose with tabs or pagination | [Full screen](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#full-screen) | Same as above. `InlineTabs` provides in-place disclosure. |
| Inline cards auto-fit height, no nested scrolling | [Inline card](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#inline-card), [Scrolling and gestures](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#scrolling-and-gestures) | Stylelint bans `overflow`/`overflow-y` `auto` and `scroll`. ESLint bans `overflow-auto`, `overflow-y-auto` and `-scroll` class strings. `Scroller` sets `overflow-y: hidden`. |
| At most two actions, at the bottom | [Inline card](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#inline-card) | Documented only. Composition is the consumer's; see roadmap v0.4. |
| Four to five data points | [Inline card](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#inline-card) | `DataList` warns in development above five items. |
| No drill-ins, breadcrumbs or multiple views | [Inline card](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#inline-card) | No breadcrumb or router component exists. `InlineTabs` is documented as same-context only. |
| Carousel: consistent card size, peek the next card | [Inline carousel](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#inline-carousel) | `Scroller` gives every item the same `itemWidth`, defaulting below 100% so the next item peeks. |
| Scroll-snap containers use safe-area insets as `scroll-padding` | [Host context for layout](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#host-context-for-layout) | `Scroller` accepts `scrollPaddingInline`. |
| Fill container width; responsive from 320px with container queries | [Host context for layout](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#host-context-for-layout), [Viewport and layout](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#viewport-and-layout) | Every story renders at 320px in CI and fails if it overflows. `DataList` stacks with a container query. `Row` and choice controls wrap. |
| No viewport units for height | [Scrolling and gestures](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#scrolling-and-gestures) | Stylelint and ESLint ban `vh`/`svh`/`lvh`/`dvh` heights and `h-screen`. |
| Tap targets at least 44×44pt with spacing | [Touch targets](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#touch-targets) | Every story in CI measures each interactive element's box. Inline `TextLink` is exempt (WCAG 2.5.8 inline exception). |
| Both themes; never hardcode colours | [Dark mode](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#dark-mode), [Visual design](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#visual-design) | Stylelint `color-no-hex` and `function-disallowed-list` outside `tokens.css`. Tailwind's palette is cleared. Every story runs in light and dark in CI. |
| Host tokens for structure; brand colour only for accents | [Visual design](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#visual-design) | All structure reads `--mcp-*` from host variables. `--mcp-accent` is the only brand hook. |
| Three type levels, two weights | [Visual design](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#visual-design) | Tailwind's size scale is limited to `xs`–`lg` plus `heading-*`. Components use regular, medium and semibold; see deviations. |
| Limited radii and border widths | [Visual design](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#visual-design) | Tailwind radius scale replaced with the host's six radii; default border width is `--border-width-regular`. |
| Monochrome outline icons in host icon colours | [Visual design](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#visual-design) | Icons use `stroke="currentColor"`, `fill="none"`; a unit test checks every icon. |
| Skeletons, not spinners | [Loading states](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#loading-states) | No spinner component. `Skeleton` respects `prefers-reduced-motion`. |
| WCAG AA contrast, keyboard navigation, text alternatives | [Accessibility](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#accessibility) | axe runs on every story in both themes; unit tests cover keyboard operation. `Avatar` and `Thumbnail` require `alt`; `SwatchRow` names each colour. |
| Style variable names and values | [Style variables](https://claude.com/docs/connectors/building/mcp-apps/design-guidelines#style-variables) | `src/styles/tokens.css` and `.storybook/hostStyles.ts` transcribe the published table. |

## Deviations and findings

- **`color-text-info` on `color-background-info` fails AA in light mode.** `#3266AD` on `#D6E4F6` measures 4.47:1 against the 4.5:1 minimum for normal text. The info `Badge` therefore uses primary text on the info background with an info border. Other tone pairs pass in both themes.
- **Weights.** The guidelines call for two weights. Headings and buttons use semibold (as in the guidelines' own button example); labels and tabs use medium. Pending a check against the Figma kit.
- **Spacing scale.** Not published in the guidelines. Tailwind's 4px scale is used until it can be read from the Figma kit.
- **Standalone fallback.** Storybook's "no host" mode uses a community capture of anthropic.com's marketing palette ([shadcn.io](https://www.shadcn.io/design/anthropic)), which has no dark palette. It never ships in the package.
