import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { GameEngine } from "../../engine/GameEngine";
import { useKeyboard } from "../../hooks/useKeyboard";
import { ScoreBoard } from "../ScoreBoard";
import type { KeyState } from "../../types/game";
import { useGetTopScoresById } from "../../api/hooks/useGetScoreById";
import { useUpdateTopScore } from "../../api/hooks/useUpdateTopScore";

export interface GameHandle {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const GameCanvas = forwardRef<GameHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | undefined>(undefined);
  const keys = useKeyboard();
  const topScore = useGetTopScoresById(Number(localStorage.getItem('id')))
 const { updateTopScore } = useUpdateTopScore(Number(localStorage.getItem('id')))

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    topScore.fetchTopScore().then((val) => setHighScore(val?.score || 0))
  },[]);

useEffect(() => {
  updateTopScore(highScore);
}, [highScore])


  const initEngine = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    engineRef.current = new GameEngine(
      ctx,
      () => keys.current as KeyState,
      setScore,
      (finalScore) => {
        setHighScore((prev) => {
          const newHigh = Math.max(prev, finalScore);
         
          return newHigh;
        });
        
    
      },
    );
    engineRef.current.start();
  };

  // Expose engine methods to parent via ref
  useImperativeHandle(ref, () => ({
    start: () => engineRef.current?.start(),
    stop: () => engineRef.current?.stop(),
    reset: () => {
      engineRef.current?.stop();
      engineRef.current = undefined;
      initEngine();
    },
  }));

  useEffect(() => {
    initEngine();
    return () => {
      engineRef.current?.stop();
    };
  }, []);

  return (
    <div>
      <ScoreBoard score={score} highScore={highScore} />
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        tabIndex={0}
        style={{ outline: "none" }}
      />
    </div>
  );
});
