import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Thumbnail } from "."

describe("Thumbnail", () => {
  it("renders an image held to its ratio", () => {
    render(<Thumbnail src="/a.png" alt="Pool" ratio="16:9" />)
    const img = screen.getByRole("img", { name: "Pool" })
    expect(img).toHaveClass("aspect-video", "object-cover")
    expect(img).toHaveAttribute("loading", "lazy")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLImageElement>()
    render(<Thumbnail ref={ref} src="/a.png" alt="" className="rounded-xl" />)
    expect(ref.current).toHaveClass("rounded-xl")
    expect(ref.current).not.toHaveClass("rounded-md")
  })
})
