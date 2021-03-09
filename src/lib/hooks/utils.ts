import { useEffect, useState } from 'react'

export const useDelay = (ms: number, deps?: any[]): boolean => {
  const [value, setValue] = useState<boolean>(false)
  useEffect(
    () => {
      if (ms < 0) return
      setValue(false)

      const timeout = window.setTimeout(() => {
        setValue(true)
      }, ms)

      return () => clearTimeout(timeout)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [ms, ...deps] : [ms],
  )

  return ms < 0 ? true : value
}
