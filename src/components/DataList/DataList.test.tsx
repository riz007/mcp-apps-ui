import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { DataList } from "."

const item = (n: number) => ({ label: `Label ${n}`, value: `Value ${n}` })

describe("DataList", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders terms and definitions", () => {
    const { container } = render(<DataList items={[item(1), item(2)]} />)
    expect(container.querySelector("dl")).toBeInTheDocument()
    expect(screen.getAllByRole("term")).toHaveLength(2)
    expect(screen.getByText("Value 2").tagName).toBe("DD")
  })

  it("warns once in development past five items", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const items = [1, 2, 3, 4, 5, 6].map(item)
    render(<DataList items={items} />)
    render(<DataList items={items} />)
    expect(warn).toHaveBeenCalledOnce()
    expect(warn.mock.calls[0]?.[0]).toMatch(/at most 5/)
  })

  it("forwards className and ref", () => {
    const ref = createRef<HTMLDListElement>()
    render(<DataList ref={ref} items={[item(1)]} className="mt-4" />)
    expect(ref.current?.tagName).toBe("DL")
    expect(ref.current).toHaveClass("mt-4")
  })
})
