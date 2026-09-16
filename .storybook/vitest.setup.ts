import { afterEach, expect } from "vitest"

const MIN_TARGET = 44
const INTERACTIVE = [
  "button:not([disabled])",
  "a[href]",
  "[role='button']",
  "[role='radio']",
  "[role='tab']",
  "[role='switch']",
  "[role='slider']",
  "[role='checkbox']",
  "input:not([type='hidden'])",
].join(",")

afterEach(() => {
  const small = [...document.querySelectorAll<HTMLElement>(INTERACTIVE)]
    .filter((el) => !el.closest("[data-inline-target]") && el.getClientRects().length > 0)
    .map((el) => ({ el, rect: el.getBoundingClientRect() }))
    .filter(({ rect }) => rect.width < MIN_TARGET - 0.5 || rect.height < MIN_TARGET - 0.5)
    .map(
      ({ el, rect }) =>
        `${el.outerHTML.slice(0, 120)} (${Math.round(rect.width)}×${Math.round(rect.height)})`,
    )

  expect(small, "tap targets smaller than 44×44").toEqual([])
  for (const frame of document.querySelectorAll<HTMLElement>(".sb-story-frame")) {
    expect(frame.scrollWidth, "story overflows a 320px container").toBeLessThanOrEqual(
      frame.clientWidth,
    )
  }
})
