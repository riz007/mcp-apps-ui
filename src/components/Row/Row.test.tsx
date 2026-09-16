import { render } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Row } from "."

describe("Row", () => {
  it("wraps by default", () => {
    const { container } = render(<Row />)
    expect(container.firstChild).toHaveClass("flex-row", "flex-wrap", "items-center")
  })

  it("can opt out of wrapping", () => {
    const { container } = render(<Row wrap={false} justify="between" />)
    expect(container.firstChild).toHaveClass("flex-nowrap", "justify-between")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Row ref={ref} className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
