import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { StatusMessage } from "."

describe("StatusMessage", () => {
  it("announces politely", () => {
    render(
      <StatusMessage tone="success" title="Saved">
        All done
      </StatusMessage>,
    )
    const status = screen.getByRole("status")
    expect(status).toHaveAttribute("aria-live", "polite")
    expect(status).toHaveTextContent("SavedAll done")
    expect(status).toHaveClass("bg-success")
  })

  it("can drop the icon", () => {
    const { container } = render(<StatusMessage icon={null}>Plain</StatusMessage>)
    expect(container.querySelector("svg")).toBeNull()
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<StatusMessage ref={ref} className="mt-2" />)
    expect(ref.current).toHaveClass("mt-2")
  })
})
