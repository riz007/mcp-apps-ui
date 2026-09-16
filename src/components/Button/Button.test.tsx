import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import { Button } from "."

describe("Button", () => {
  it("renders a button of type button", () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("type", "button")
  })

  it("activates from the keyboard", async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)
    await userEvent.tab()
    expect(screen.getByRole("button")).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await userEvent.keyboard(" ")
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it("does not fire when disabled", async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <Button ref={ref} className="mt-4">
        Save
      </Button>,
    )
    expect(ref.current).toBe(screen.getByRole("button"))
    expect(ref.current).toHaveClass("mt-4")
  })

  it("keeps a 44px minimum height at the small size", () => {
    render(<Button size="sm">Save</Button>)
    expect(screen.getByRole("button")).toHaveClass("min-h-11", "min-w-11")
  })

  it("lets consumer classes win over defaults", () => {
    render(<Button className="px-8">Save</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("px-8")
    expect(button).not.toHaveClass("px-4")
  })

  it("renders its child when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/book">Book</a>
      </Button>,
    )
    const link = screen.getByRole("link", { name: "Book" })
    expect(link).not.toHaveAttribute("type")
    expect(link).toHaveClass("min-h-12")
  })
})
