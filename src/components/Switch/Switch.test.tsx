import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Switch } from "."

describe("Switch", () => {
  it("is labelled and described", () => {
    render(<Switch label="Notify me" description="In this conversation" />)
    const control = screen.getByRole("switch", { name: "Notify me" })
    expect(control).toHaveAccessibleDescription("In this conversation")
    expect(control).not.toBeChecked()
  })

  it("toggles with Space and by clicking the label", async () => {
    const onChange = vi.fn()
    render(<Switch label="Notify me" onChange={onChange} />)
    await userEvent.tab()
    await userEvent.keyboard(" ")
    expect(onChange).toHaveBeenLastCalledWith(true)
    await userEvent.click(screen.getByText("Notify me"))
    expect(onChange).toHaveBeenLastCalledWith(false)
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLButtonElement>()
    const { container } = render(<Switch ref={ref} label="Notify" className="mt-4" />)
    expect(ref.current).toBe(screen.getByRole("switch"))
    expect(container.firstChild).toHaveClass("mt-4")
  })
})
