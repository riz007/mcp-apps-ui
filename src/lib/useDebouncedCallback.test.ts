import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useDebouncedCallback } from "./useDebouncedCallback"

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("calls once with the latest arguments after the delay", () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 150))
    act(() => {
      result.current[0](1)
      result.current[0](2)
      vi.advanceTimersByTime(149)
    })
    expect(callback).not.toHaveBeenCalled()
    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(callback).toHaveBeenCalledOnce()
    expect(callback).toHaveBeenCalledWith(2)
  })

  it("flushes a pending call immediately", () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useDebouncedCallback(callback, 150))
    act(() => {
      result.current[0](5)
      result.current[1]()
    })
    expect(callback).toHaveBeenCalledWith(5)
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(callback).toHaveBeenCalledOnce()
  })

  it("drops pending calls on unmount", () => {
    const callback = vi.fn()
    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 150))
    act(() => result.current[0](1))
    unmount()
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(callback).not.toHaveBeenCalled()
  })
})
