import { useRef } from "react"
import {GameCanvas, type GameHandle } from "../components/GameCanvas"

export const GameAlpaca = () => {
  const gameRef = useRef<GameHandle>(null)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <GameCanvas ref={gameRef} />
    </div>
  )
}