import type { QueryResult } from "typeorm";
import { pool } from "../api/DBConnection.js";
import { AppError } from "../errors/AppError.js";
import type { ListRow, LogRow, nameRow, UserRow } from "../util/types.js";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}

export const enterList = async (id: number): Promise<void> => {
  try {
    await pool.query<ListRow>(
      "INSERT INTO jns.list(user_id, enter_time) VALUES ($1, NOW())",
      [id],
    );
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
    l.enter_time::timestamp::time,
    l.exit_time::timestamp::time,
    u.name,
    l.enter_time::timestamp::date as date
    FROM jns.list l
    JOIN jns.users u ON u.id = l.user_id`,
    );
    return r.rows;
  } catch (err) {
    throw err;
  }
};
