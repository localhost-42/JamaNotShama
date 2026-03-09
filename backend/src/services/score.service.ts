import { pool } from "../api/DBConnection.js"
import { io } from "../server.js";
import type { ScoreRow } from "../util/types.js";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}


export const updateTopScore: (score: number, id: number ) => Promise<number> = async (score: number, id: number) => {
  try {
   const update = await pool.query(
        `INSERT INTO jns.alpaca_run (user_id, top_score)
        VALUES ($1, $2)
        ON CONFLICT (user_id)
        DO UPDATE SET top_score = EXCLUDED.top_score
         RETURNING *;`, [score, id]);

         io.emit("scoreUpdated");


     return update.rows[0].top_score;
   
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new Error("User not found");
    }   
    throw err;
  }
}

export const getTopScores: () => Promise<ScoreRow[]> = async () => {
  try {
    const r = await pool.query<ScoreRow>( 'SELECT u.name, a.top_score FROM jns.alpaca_run a JOIN jns.users u ON a.user_id = u.id ORDER BY a.top_score DESC LIMIT 10'); 

    return r.rows;
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      return [];
    }       
    throw err;  
 }
}