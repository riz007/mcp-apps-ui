import { render } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { Stack } from "."

describe("Stack", () => {
  it("lays children out vertically with a gap", () => {
    const { container } = render(
      <Stack gap={4}>
        <span>a</span>
        <span>b</span>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass("flex-col", "gap-4")
  })

  it("renders as its child", () => {
    const { container } = render(
      <Stack asChild>
        <ul />
      </Stack>,
    )
    expect(container.firstChild?.nodeName).toBe("UL")
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<Stack ref={ref} gap={2} className="gap-6" />)
    expect(ref.current).toHaveClass("gap-6")
    expect(ref.current).not.toHaveClass("gap-2")
  })
})
