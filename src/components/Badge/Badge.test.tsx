import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Badge } from "."

describe("Badge", () => {
  it("renders its text with the colour classes", () => {
    render(<Badge color="danger">Cancelled</Badge>)
    expect(screen.getByText("Cancelled")).toHaveClass("bg-danger", "text-danger")
  })

  it("defaults to neutral", () => {
    render(<Badge>Draft</Badge>)
    expect(screen.getByText("Draft")).toHaveClass("bg-surface")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <Badge ref={ref} className="ml-auto">
        New
      </Badge>,
    )
    expect(ref.current).toHaveClass("ml-auto")
  })
})
