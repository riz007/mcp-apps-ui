import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { ButtonLink } from "."

describe("ButtonLink", () => {
  it("renders an anchor with button styling", () => {
    render(<ButtonLink href="/trip">View trip</ButtonLink>)
    const link = screen.getByRole("link", { name: "View trip" })
    expect(link).toHaveAttribute("href", "/trip")
    expect(link).toHaveClass("min-h-12")
  })

  it("is reachable by keyboard", async () => {
    render(<ButtonLink href="/trip">View trip</ButtonLink>)
    await userEvent.tab()
    expect(screen.getByRole("link")).toHaveFocus()
  })

  it("marks external links", () => {
    render(
      <ButtonLink href="https://example.com" external>
        Maps
      </ButtonLink>,
    )
    const link = screen.getByRole("link", { name: /Maps.*opens in a new tab/ })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLAnchorElement>()
    render(
      <ButtonLink ref={ref} href="#" className="mt-2">
        Go
      </ButtonLink>,
    )
    expect(ref.current).toBe(screen.getByRole("link"))
    expect(ref.current).toHaveClass("mt-2")
  })
})
