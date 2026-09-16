# Contributor guide

mcp-apps-ui is a presentational React component library for MCP Apps rendered in Claude: Tailwind 4 tokens that read host style variables, components shaped by the MCP Apps design guidelines, and tests that keep them there.

Read [CONFORMANCE.md](./CONFORMANCE.md) for the rules and how each is enforced.

## Layout

- `src/components/<Name>/index.tsx` — the component. One folder per public subpath export.
- `src/components/<Name>/<Name>.stories.tsx` — stories. Title `Components/<Group>/<Name>`.
- `src/components/<Name>/<Name>.test.tsx` — unit tests (Vitest, happy-dom, Testing Library).
- `src/lib/` — internal helpers. Not exported by subpath.
- `src/styles/` — `tokens.css`, `theme.css`, `base.css`, `index.css` ship. `standalone.css` never does.
- `src/docs/` — Storybook MDX pages and pattern stories.
- `.storybook/` — Storybook config, the simulated host and the story test hooks.

## Hard rules

1. Nothing floats. No popover, dropdown, select, tooltip, dialog, drawer, hover card or menu, from Radix or anywhere else.
2. Nothing scrolls vertically. `Scroller` is the only scroll container and it is horizontal.
3. No literal colours outside `tokens.css`. Use token utilities such as `bg-surface`, `text-secondary`, `border-subtle`.
4. Every interactive element is at least 44×44 at its smallest size.
5. No `console`, storage, cookies or `window.openai` in shipped code. Development warnings go through `devWarning`.
6. Never redefine a host variable (`--color-*`, `--font-*`, `--border-*`, `--shadow-*`). Read it into an `--mcp-*` property.

## Component conventions

- `forwardRef`, and merge `className` last through `cn()` so consumer classes win.
- `variant` and `color` props rather than compound names; `block` for full width; `asChild` where composition helps.
- Support controlled and uncontrolled use via `useControllableState`.
- Controls that need a name take a required `label` and an optional `hideLabel`.
- Keep class strings literal so Tailwind can find them in `dist`.
- Comment only what the code can't say.

## Before you open a pull request

```bash
npm run format:fix
npm run lint
npm run types
npm test
npm run test:stories
npm run build && npm run check:bundle
```

Add or update stories for every visual change, and a CONFORMANCE.md row if you touch a guideline rule.
