import { render } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Skeleton } from "."

describe("Skeleton", () => {
  it("is hidden from assistive technology and pauses for reduced motion", () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true")
    expect(container.firstChild).toHaveClass("animate-pulse", "motion-reduce:animate-none")
  })

  it("renders several lines", () => {
    const { container } = render(<Skeleton lines={3} />)
    expect(container.firstChild?.childNodes).toHaveLength(3)
  })

  it("renders a circle", () => {
    const { container } = render(<Skeleton variant="circle" />)
    expect(container.firstChild).toHaveClass("rounded-full")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Skeleton ref={ref} variant="block" className="h-40" />)
    expect(ref.current).toHaveClass("h-40")
    expect(ref.current).not.toHaveClass("h-24")
  })
})
