import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Separator } from "."

describe("Separator", () => {
  it("is decorative by default", () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveAttribute("role", "none")
  })

  it("exposes a vertical separator when not decorative", () => {
    render(<Separator orientation="vertical" decorative={false} />)
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Separator ref={ref} className="my-2" />)
    expect(ref.current).toHaveClass("my-2", "border-subtle")
  })
})
