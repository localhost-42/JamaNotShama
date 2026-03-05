import { pool } from "../api/DBConnection.js";
import { AppError } from "../errors/AppError.js";
import { type QueryResult } from "pg";
import type { ExcelReportRow, LogRow, UserRow } from "../util/types.js";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}

export const loginDB = async (id: number, name: string): Promise<UserRow> => {
  try {
    const r = await pool.query<UserRow>(
      "INSERT INTO jns.users(id, name) VALUES ($1, $2) RETURNING id, name",
      [id, name.trim()],
    );
    return r.rows[0]!;
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      return { userId: id, name: name };
    }
    throw err;
  }
};

export const excelDB = async (): Promise<ExcelReportRow[]> => {
  try {
    const result = await pool.query<ExcelReportRow>(`
    SELECT 
    l.enter_time::timestamp::time,
    l.exit_time::timestamp::time,
    u.name,
    l.enter_time::timestamp::date as date
    FROM jns.list l
    JOIN jns.users u ON u.id = l.user_id
    `);

    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const logsDB = async (): Promise<LogRow[]> => {
  try {
    const r: QueryResult<LogRow> = await pool.query(
      "SELECT * FROM jns.list WHERE exit_time IS NOT NULL AND enter_time IS NOT NULL ORDER BY enter_time ASC",
    );
    return r.rows;
  } catch (err) {
    throw err;
  }
};

export const getListDB = async (): Promise<LogRow[]> => {
  try {
    const r: QueryResult<LogRow> = await pool.query(
      "SELECT * FROM jns.list ORDER BY enter_time ASC",
    );
    return r.rows;
  } catch (err) {
    throw err;
  }
};

export const getQueueDB = async (): Promise<LogRow[]> => {
  try {
    const r: QueryResult<LogRow> = await pool.query(
      "SELECT * FROM jns.queue ORDER BY enter_time ASC",
    );
    return r.rows;
  } catch (err) {
    throw err;
  }
};
