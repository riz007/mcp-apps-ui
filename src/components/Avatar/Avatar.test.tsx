import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Avatar } from "."

describe("Avatar", () => {
  it("falls back to initials with an accessible name", () => {
    render(<Avatar alt="Mali Chaiyaporn" />)
    const img = screen.getByRole("img", { name: "Mali Chaiyaporn" })
    expect(img).toHaveTextContent("MC")
  })

  it("uses a custom fallback", () => {
    render(<Avatar alt="Acme Hotels" fallback="A" />)
    expect(screen.getByRole("img", { name: "Acme Hotels" })).toHaveTextContent("A")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Avatar ref={ref} alt="Sam" className="ring-2" />)
    expect(ref.current).toHaveClass("ring-2", "aspect-square")
  })
})
