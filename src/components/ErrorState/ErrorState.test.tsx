import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it } from "vitest"
import { ErrorState } from "."
import { Button } from "../Button"

describe("ErrorState", () => {
  it("renders as an alert with a reachable recovery action", async () => {
    render(<ErrorState title="Failed" action={<Button>Try again</Button>} />)
    expect(screen.getByRole("alert")).toHaveTextContent("Failed")
    await userEvent.tab()
    expect(screen.getByRole("button", { name: "Try again" })).toHaveFocus()
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ErrorState ref={ref} title="Failed" className="mt-4" />)
    expect(ref.current).toHaveClass("mt-4")
  })
})
