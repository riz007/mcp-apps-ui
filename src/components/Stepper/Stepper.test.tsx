import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Stepper } from "."

describe("Stepper", () => {
  it("exposes a spinbutton", () => {
    render(<Stepper label="Guests" defaultValue={2} min={1} max={8} />)
    const spin = screen.getByRole("spinbutton", { name: "Guests" })
    expect(spin).toHaveAttribute("aria-valuenow", "2")
    expect(spin).toHaveAttribute("aria-valuemax", "8")
  })

  it("adjusts with arrow, Home and End keys and clamps", async () => {
    const onChange = vi.fn()
    render(<Stepper label="Guests" defaultValue={2} min={1} max={4} onChange={onChange} />)
    await userEvent.tab()
    await userEvent.keyboard("{ArrowUp}")
    expect(onChange).toHaveBeenLastCalledWith(3)
    await userEvent.keyboard("{End}")
    expect(onChange).toHaveBeenLastCalledWith(4)
    await userEvent.keyboard("{ArrowUp}")
    expect(onChange).toHaveBeenCalledTimes(2)
    await userEvent.keyboard("{Home}")
    expect(onChange).toHaveBeenLastCalledWith(1)
  })

  it("steps with buttons and disables them at the bounds", async () => {
    render(<Stepper label="Guests" defaultValue={1} min={1} max={2} />)
    expect(screen.getByRole("button", { name: "Decrease Guests" })).toBeDisabled()
    await userEvent.click(screen.getByRole("button", { name: "Increase Guests" }))
    expect(screen.getByRole("spinbutton")).toHaveAttribute("aria-valuenow", "2")
    expect(screen.getByRole("button", { name: "Increase Guests" })).toBeDisabled()
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Stepper ref={ref} label="Guests" className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
