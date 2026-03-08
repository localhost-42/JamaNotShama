import { pool } from "../api/DBConnection.js";
import type {  UserRow } from "../util/types.js";

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


