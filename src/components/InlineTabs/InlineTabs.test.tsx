import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { InlineTabs } from "."

const tabs = [
  { value: "a", label: "Outbound", content: "Outbound details" },
  { value: "b", label: "Return", content: "Return details" },
]

describe("InlineTabs", () => {
  it("shows the first tab by default", () => {
    render(<InlineTabs label="Flight" tabs={tabs} />)
    expect(screen.getByRole("tablist", { name: "Flight" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Outbound" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Outbound details")
  })

  it("switches tabs with arrow keys", async () => {
    const onChange = vi.fn()
    render(<InlineTabs label="Flight" tabs={tabs} onChange={onChange} />)
    await userEvent.tab()
    await userEvent.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: "Return" })).toHaveFocus()
    expect(onChange).toHaveBeenLastCalledWith("b")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Return details")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<InlineTabs ref={ref} label="Flight" tabs={tabs} className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
