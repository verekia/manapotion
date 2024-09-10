import { useEffect, useLayoutEffect, useRef } from 'react'

// Borrowed from https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/utils.ts

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  (window.document?.createElement || window.navigator?.product === 'ReactNative')
    ? useLayoutEffect
    : useEffect

export function useMutableCallback<T>(fn: T) {
  const ref = useRef<T>(fn)
  useIsomorphicLayoutEffect(() => void (ref.current = fn), [fn])
  return ref
}
