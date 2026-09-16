import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { EmptyState } from "."
import { Button } from "../Button"

describe("EmptyState", () => {
  it("renders title, description and a reachable action", async () => {
    render(
      <EmptyState title="Nothing yet" description="Try later" action={<Button>Refresh</Button>} />,
    )
    expect(screen.getByText("Nothing yet")).toBeInTheDocument()
    expect(screen.getByText("Try later")).toBeInTheDocument()
    await userEvent.tab()
    expect(screen.getByRole("button", { name: "Refresh" })).toHaveFocus()
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<EmptyState ref={ref} title="Empty" className="py-10" />)
    expect(ref.current).toHaveClass("py-10")
    expect(ref.current).not.toHaveClass("py-6")
  })
})
