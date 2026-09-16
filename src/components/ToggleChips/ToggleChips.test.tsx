import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { ToggleChips } from "."

const options = [
  { value: "thai", label: "Thai" },
  { value: "italian", label: "Italian" },
]

describe("ToggleChips", () => {
  it("renders pressed state per chip", () => {
    render(<ToggleChips label="Cuisine" options={options} defaultValue={["thai"]} />)
    expect(screen.getByRole("toolbar", { name: "Cuisine" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Thai" })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: "Italian" })).toHaveAttribute("aria-pressed", "false")
  })

  it("toggles several chips from the keyboard", async () => {
    const onChange = vi.fn()
    render(<ToggleChips label="Cuisine" options={options} onChange={onChange} />)
    await userEvent.tab()
    await userEvent.keyboard(" ")
    await userEvent.keyboard("{ArrowRight} ")
    expect(onChange).toHaveBeenLastCalledWith(["thai", "italian"])
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ToggleChips ref={ref} label="Cuisine" options={options} className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
