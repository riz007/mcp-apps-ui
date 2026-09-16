import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Scroller } from "."

describe("Scroller", () => {
  it("is a named, focusable region that only scrolls sideways", async () => {
    render(
      <Scroller label="Hotels">
        <div>One</div>
        <div>Two</div>
      </Scroller>,
    )
    const region = screen.getByRole("region", { name: "Hotels" })
    expect(region).toHaveClass("overflow-x-auto", "overflow-y-hidden", "snap-x")
    await userEvent.tab()
    expect(region).toHaveFocus()
  })

  it("wraps each child in a snapping item of the given width", () => {
    render(
      <Scroller label="Hotels" itemWidth="70%">
        <div>One</div>
        {null}
        <div>Two</div>
      </Scroller>,
    )
    const items = screen.getByRole("region").children
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveClass("snap-start")
    expect(items[0]).toHaveStyle({ width: "70%" })
  })

  it("applies safe-area scroll padding", () => {
    render(<Scroller label="Hotels" scrollPaddingInline={24} />)
    expect(screen.getByRole("region")).toHaveStyle({ scrollPaddingInline: "24px" })
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Scroller ref={ref} label="Hotels" className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
