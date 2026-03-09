import type { QueryResult } from "typeorm";
import { pool } from "../api/DBConnection.js";
import { AppError } from "../errors/AppError.js";
import type { ListRow, LogRow, nameRow, UserRow } from "../util/types.js";
import { io } from "../server.js";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}

export const enterList = async (id: number): Promise<void> => {
  try {
    const MAX_OUTSIDE = 5;

    const countResult = await pool.query<{ count: string }>(
      "SELECT COUNT(*) FROM jns.list WHERE exit_time IS NULL",
    );

    const currentCount = Number(countResult.rows[0].count);

    if (currentCount >= MAX_OUTSIDE) {
      throw new AppError("List is full", 400);
    }

    await pool.query<ListRow>(
      "INSERT INTO jns.list(user_id, enter_time) VALUES ($1, NOW())",
      [id],
    );

    io.emit("listUpdated");
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new AppError("User is already in the list", 400);
    }
    throw err;
  }
};

export const exitList = async (id: number): Promise<void> => {
  try {
    await pool.query<ListRow>(
      "UPDATE jns.list SET exit_time = NOW() WHERE user_id = $1 AND exit_time IS NULL",
      [id],
    );

    io.emit("listUpdated");
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new AppError("User is already out of the list", 400);
    }

    throw err;
  }
};

export const getList = async (): Promise<nameRow[]> => {
  try {
    const r = await pool.query<nameRow>(
      "SELECT u.name FROM jns.list l JOIN jns.users u ON l.user_id = u.id WHERE l.exit_time IS NULL ORDER BY l.enter_time ASC",
    );
    return r.rows;
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      return [];
    }
    throw err;
  }
};

export const getLogs = async (): Promise<LogRow[]> => {
  try {
    const r = await pool.query<LogRow>(
      `SELECT 
    l.enter_time,
    l.exit_time,
    u.name,
    l.enter_time as date
    FROM jns.list l
    JOIN jns.users u ON u.id = l.user_id
    WHERE l.exit_time IS NOT NULL AND 
    l.enter_time IS NOT NULL;`,
    );

    return r.rows;
  } catch (err) {
    throw err;
  }
};
