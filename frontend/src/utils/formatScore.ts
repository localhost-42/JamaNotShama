export function formatScore(score: number): string {
  return score.toString().padStart(5, "0")
}