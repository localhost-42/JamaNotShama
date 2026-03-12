import { useEffect, type FC } from "react"
import { formatScore } from "../../utils/formatScore"
import { useUpdateTopScore } from "../../api/hooks/useUpdateTopScore"

interface Props {
  score: number
  highScore: number
}

export const ScoreBoard: FC<Props> = ({ score, highScore }) => {
 const { updateTopScore } = useUpdateTopScore();

 useEffect(() => {
   updateTopScore(highScore, parseInt(localStorage.getItem("id") || '0'))
   .then((score) => {localStorage.setItem("alpaca_highscore", (score || 0).toString())})
  }, [highScore])
          

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