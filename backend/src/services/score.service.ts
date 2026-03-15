import { pool } from "../api/DBConnection.js";
import { io } from "../server.js";
import type { ScoreRow } from "../util/types.js";

function getPgErrorCode(error: unknown): string | undefined {
  if (typeof error === "object" && error !== null && "code" in error) {
    return String((error as { code: unknown }).code);
  }

  return undefined;
}

export const updateTopScore = async (
  userId: number,
  score: number,
): Promise<number> => {
  if (!Number.isInteger(userId)) {
    throw new Error(`Invalid userId: ${userId}`);
  }

  if (!Number.isInteger(score)) {
    throw new Error(`Invalid score: ${score}`);
  }

  try {
    const result = await pool.query<{ top_score: number }>(
      `
      INSERT INTO jns.alpaca_run (user_id, top_score)
      VALUES ($1, $2)
      ON CONFLICT (user_id)
      DO UPDATE SET top_score = EXCLUDED.top_score
      RETURNING top_score;
      `,
      [userId, score],
    );

    io.emit("scoreUpdated");

    return result.rows[0].top_score;
  } catch (error) {
    const errorCode = getPgErrorCode(error);

    if (errorCode === "23503") {
      throw new Error("User not found");
    }

    if (errorCode === "22P02") {
      throw new Error("Invalid integer value sent to database");
    }

    throw error;
  }
};

export const getTopScoreById = async (userId: number): Promise<ScoreRow | null> => {
  if (!Number.isInteger(userId)) {
    throw new Error(`Invalid userId: ${userId}`);
  }

  const result = await pool.query<ScoreRow>(
    `
    SELECT u.name, a.top_score
    FROM jns.alpaca_run a
    INNER JOIN jns.users u ON a.user_id = u.id
    WHERE a.user_id = $1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};

export const getTopScores = async (): Promise<ScoreRow[]> => {
  const result = await pool.query<ScoreRow>(
    `
    SELECT u.name, a.top_score
    FROM jns.alpaca_run a
    JOIN jns.users u ON a.user_id = u.id
    ORDER BY a.top_score DESC
    LIMIT 10
    `,
  );

  return result.rows;
};