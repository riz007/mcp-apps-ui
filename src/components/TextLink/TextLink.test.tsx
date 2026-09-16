import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { TextLink } from "."

describe("TextLink", () => {
  it("renders a link", () => {
    render(<TextLink href="/policy">policy</TextLink>)
    expect(screen.getByRole("link", { name: "policy" })).toHaveAttribute("href", "/policy")
  })

  it("is reachable by keyboard", async () => {
    render(<TextLink href="/policy">policy</TextLink>)
    await userEvent.tab()
    expect(screen.getByRole("link")).toHaveFocus()
  })

  it("announces external links", () => {
    render(
      <TextLink href="https://example.com" external>
        site
      </TextLink>,
    )
    expect(screen.getByRole("link", { name: /site.*opens in a new tab/ })).toHaveAttribute(
      "target",
      "_blank",
    )
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLAnchorElement>()
    render(
      <TextLink ref={ref} href="#" className="font-semibold">
        x
      </TextLink>,
    )
    expect(ref.current).toHaveClass("font-semibold")
    expect(ref.current).not.toHaveClass("font-medium")
  })
})
