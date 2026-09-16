import { act, fireEvent, render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Slider } from "."

describe("Slider", () => {
  it("exposes a labelled slider", () => {
    render(<Slider label="Max price" defaultValue={40} formatValue={(v) => `$${v}`} />)
    const slider = screen.getByRole("slider", { name: "Max price" })
    expect(slider).toHaveAttribute("aria-valuenow", "40")
    expect(slider).toHaveAttribute("aria-valuetext", "$40")
  })

  it("steps with arrow keys and reports each committed value", () => {
    const onChange = vi.fn()
    render(<Slider label="Max price" defaultValue={40} onChange={onChange} />)
    const slider = screen.getByRole("slider")
    act(() => slider.focus())
    fireEvent.keyDown(slider, { key: "ArrowRight" })
    fireEvent.keyDown(slider, { key: "End" })
    expect(slider).toHaveAttribute("aria-valuenow", "100")
    expect(onChange).toHaveBeenNthCalledWith(1, 41)
    expect(onChange).toHaveBeenLastCalledWith(100)
  })

  it("follows a controlled value", () => {
    const { rerender } = render(<Slider label="Price" value={10} />)
    rerender(<Slider label="Price" value={30} />)
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "30")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Slider ref={ref} label="Price" className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
