import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import * as Icons from "."

const { createIcon: _createIcon, ...set } = Icons

describe("Icon", () => {
  it("hides decorative icons", () => {
    const { container } = render(<Icons.Calendar />)
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
  })

  it("names icons given a title", () => {
    render(<Icons.Warning title="Warning" />)
    expect(screen.getByRole("img", { name: "Warning" })).toBeInTheDocument()
  })

  it("draws every icon as a 24px outline in currentColor", () => {
    for (const [name, Icon] of Object.entries(set)) {
      const { container, unmount } = render(<Icon />)
      const svg = container.querySelector("svg")
      expect(svg, name).toHaveAttribute("viewBox", "0 0 24 24")
      expect(svg, name).toHaveAttribute("stroke", "currentColor")
      expect(svg, name).toHaveAttribute("fill", "none")
      unmount()
    }
  })

  it("forwards className and ref", () => {
    const ref = createRef<SVGSVGElement>()
    render(<Icons.Star ref={ref} className="size-4" />)
    expect(ref.current).toHaveClass("size-4")
    expect(ref.current).not.toHaveClass("size-5")
  })
})
