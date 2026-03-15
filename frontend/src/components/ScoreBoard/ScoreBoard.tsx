import { useEffect, type FC } from "react"
import { formatScore } from "../../utils/formatScore"
import { useUpdateTopScore } from "../../api/hooks/useUpdateTopScore"

interface Props {
  score: number
  highScore: number
}

export const ScoreBoard: FC<Props> = ({ score, highScore }) => {

  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: 18,
        marginBottom: 10,
        userSelect: "none"
      }}
    >
      HI {formatScore(highScore)} | {formatScore(score)}
    </div>
  )
}