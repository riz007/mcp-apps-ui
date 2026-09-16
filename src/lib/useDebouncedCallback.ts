import { useCallback, useEffect, useRef } from "react"

export function useDebouncedCallback<Args extends unknown[]>(
  callback: ((...args: Args) => void) | undefined,
  delay: number,
) {
  const callbackRef = useRef(callback)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const pending = useRef<Args | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  })

  const flush = useCallback(() => {
    clearTimeout(timer.current)
    if (pending.current) {
      const args = pending.current
      pending.current = null
      callbackRef.current?.(...args)
    }
  }, [])

  const debounced = useCallback(
    (...args: Args) => {
      pending.current = args
      clearTimeout(timer.current)
      if (delay <= 0) {
        flush()
        return
      }
      timer.current = setTimeout(flush, delay)
    },
    [delay, flush],
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  return [debounced, flush] as const
}
