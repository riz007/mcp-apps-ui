import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { SwatchRow } from "."

const swatches = [
  { value: "clay", name: "Clay", color: "#D97757" },
  { value: "sky", name: "Sky", color: "#6A9BCC" },
]

describe("SwatchRow", () => {
  it("names each swatch", () => {
    render(<SwatchRow label="Colour" swatches={swatches} />)
    expect(screen.getByRole("radiogroup", { name: "Colour" })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "Clay" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "Sky" })).not.toBeChecked()
  })

  it("selects with arrow keys", async () => {
    const onChange = vi.fn()
    render(<SwatchRow label="Colour" swatches={swatches} onChange={onChange} />)
    await userEvent.tab()
    await userEvent.keyboard("{ArrowRight}")
    expect(screen.getByRole("radio", { name: "Sky" })).toHaveFocus()
    await userEvent.keyboard(" ")
    expect(onChange).toHaveBeenLastCalledWith("sky")
    expect(screen.getByRole("radio", { name: "Sky" })).toBeChecked()
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<SwatchRow ref={ref} label="Colour" swatches={swatches} className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
