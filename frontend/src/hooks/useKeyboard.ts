import { useEffect, useRef } from "react"
import type { KeyState } from "../types/game"

export function useKeyboard() {
  const keys = useRef<KeyState>({
    ArrowUp: false,
    ArrowDown: false
  })

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault()
        keys.current[e.key] = true
      }
    }

    const handleUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault()
        keys.current[e.key] = false
      }
    }

    window.addEventListener("keydown", handleDown)
    window.addEventListener("keyup", handleUp)

    return () => {
      window.removeEventListener("keydown", handleDown)
      window.removeEventListener("keyup", handleUp)
    }
  }, [])

  return keys
}