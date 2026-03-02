import { pool } from "../api/DBConnection";
import { AppError } from "../errors/appError";
import { type QueryResult } from "pg";
import type { LogRow, UserRow } from "../util/types";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}

export const loginDB = async (id: number, name: string): Promise<UserRow> => {
  try {
    const r = await pool.query<UserRow>(
      "INSERT INTO users(user_id, name) VALUES ($1, $2) RETURNING user_id, name",
      [id, name.trim()],
    );
    return r.rows[0]!;
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      return { user_id: id, name: name };
    }
    throw err;
  }
};

export const logsDB = async (): Promise<LogRow[]> => {
  try {
    const r: QueryResult<LogRow> = await pool.query(
      "SELECT * FROM logs ORDER BY enter_time ASC",
    );
    return r.rows;
  } catch (err) {
    throw err;
  }
};
