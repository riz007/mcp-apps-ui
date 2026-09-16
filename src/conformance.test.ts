import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { describe, expect, it } from "vitest"

const root = join(import.meta.dirname)

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const shipped = walk(root).filter(
  (file) =>
    /\.(tsx?|css)$/.test(file) &&
    !/\.(test|stories)\.tsx?$/.test(file) &&
    !file.includes(`${root}/docs/`) &&
    !file.endsWith("standalone.css"),
)

function offenders(pattern: RegExp, files = shipped) {
  return files
    .filter((file) => pattern.test(readFileSync(file, "utf8")))
    .map((file) => relative(root, file))
}

describe("guideline constraints in shipped source", () => {
  it("never creates a vertical scroll container", () => {
    expect(offenders(/\boverflow(-y)?-(auto|scroll)\b|overflow(-y)?:\s*(auto|scroll)/)).toEqual([])
  })

  it("never sizes height with viewport units", () => {
    expect(
      offenders(/\b(min-|max-)?h-(screen|svh|lvh|dvh)\b|\b\d+(\.\d+)?(vh|svh|lvh|dvh)\b/),
    ).toEqual([])
  })

  it("never imports a floating Radix primitive", () => {
    expect(
      offenders(
        /@radix-ui\/react-(popover|dropdown-menu|select|tooltip|dialog|alert-dialog|hover-card|context-menu|navigation-menu|menubar|toast)/,
      ),
    ).toEqual([])
  })

  it("never uses a literal colour outside tokens.css", () => {
    const files = shipped.filter((file) => !file.endsWith("tokens.css"))
    expect(offenders(/#[0-9a-fA-F]{3,8}\b(?![-\w])|\brgba?\(|\bhsla?\(/, files)).toEqual([])
  })

  it("never touches storage, cookies or the ChatGPT bridge", () => {
    expect(offenders(/localStorage|sessionStorage|document\.cookie|window\.openai/)).toEqual([])
  })

  it("keeps every component on the 44px minimum", () => {
    const interactive = [
      "Button",
      "SegmentedControl",
      "ToggleChips",
      "InlineTabs",
      "Stepper",
      "SwatchRow",
      "Switch",
      "Slider",
    ]
    const missing = interactive.filter((name) => {
      const source = readFileSync(join(root, "components", name, "index.tsx"), "utf8")
      return !/\b(min-h-11|h-11|size-11)\b/.test(source)
    })
    expect(missing).toEqual([])
  })
})
