import { useCallback, useEffect, useRef, useState } from "react"

type Params<T> = {
  value: T | undefined
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({ value, defaultValue, onChange }: Params<T>) {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  })

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      if (!Object.is(next, current)) onChangeRef.current?.(next)
    },
    [isControlled, current],
  )

  return [current, setValue] as const
}
