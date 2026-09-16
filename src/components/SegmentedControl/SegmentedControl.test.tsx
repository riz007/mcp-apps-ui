import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { SegmentedControl } from "."

const options = [
  { value: "indoor", label: "Indoor" },
  { value: "patio", label: "Patio" },
  { value: "bar", label: "Bar" },
]

describe("SegmentedControl", () => {
  it("labels the group", () => {
    render(<SegmentedControl label="Seating" options={options} />)
    expect(screen.getByRole("radiogroup", { name: "Seating" })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "Indoor" })).toBeChecked()
  })

  it("moves with arrow keys and selects with Space", async () => {
    const onChange = vi.fn()
    render(<SegmentedControl label="Seating" options={options} onChange={onChange} />)
    await userEvent.tab()
    expect(screen.getByRole("radio", { name: "Indoor" })).toHaveFocus()
    await userEvent.keyboard("{ArrowRight}")
    expect(screen.getByRole("radio", { name: "Patio" })).toHaveFocus()
    await userEvent.keyboard(" ")
    expect(onChange).toHaveBeenLastCalledWith("patio")
    expect(screen.getByRole("radio", { name: "Patio" })).toBeChecked()
  })

  it("never deselects the current option", async () => {
    const onChange = vi.fn()
    render(<SegmentedControl label="Seating" options={options} onChange={onChange} />)
    await userEvent.click(screen.getByRole("radio", { name: "Indoor" }))
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole("radio", { name: "Indoor" })).toBeChecked()
  })

  it("respects a controlled value", async () => {
    render(<SegmentedControl label="Seating" options={options} value="bar" />)
    await userEvent.click(screen.getByRole("radio", { name: "Patio" }))
    expect(screen.getByRole("radio", { name: "Bar" })).toBeChecked()
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<SegmentedControl ref={ref} label="Seating" options={options} className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
