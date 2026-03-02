import { pool } from "../api/DBConnection";
import { AppError } from "../errors/appError";
import { type QueryResult } from "pg";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}

export class UserService {
  async list(): Promise<UserRow[]> {
    const r: QueryResult<UserRow> = await pool.query(
      "SELECT id, name FROM users ORDER BY id DESC",
    );
    return r.rows;
  }

  async getById(id: number): Promise<UserRow> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError(
        "id must be a positive integer",
        400,
        "VALIDATION_ERROR",
      );
    }

    const r = await pool.query<UserRow>(
      "SELECT id, name FROM users WHERE id = $1",
      [id],
    );

    const user = r.rows[0];
    if (!user) throw new AppError("User not found", 404, "NOT_FOUND");
    return user;
  }

  async create(name: string): Promise<UserRow> {
    if (!name || name.trim().length < 2) {
      throw new AppError(
        "name must be at least 2 chars",
        400,
        "VALIDATION_ERROR",
      );
    }

    try {
      const r = await pool.query<UserRow>(
        "INSERT INTO users(name) VALUES ($1) RETURNING id, name",
        [name.trim()],
      );
      return r.rows[0]!;
    } catch (err) {
      if (isPgUniqueViolation(err)) {
        throw new AppError(
          "User with this name already exists",
          409,
          "DUPLICATE",
        );
      }
      throw err; // יתפס ע"י error middleware
    }
  }

  // דוגמה ל-transaction
  async renameWithAudit(id: number, newName: string): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const u = await client.query<UserRow>(
        "UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name",
        [newName.trim(), id],
      );
      if (u.rowCount === 0)
        throw new AppError("User not found", 404, "NOT_FOUND");

      await client.query("INSERT INTO logs(event, message) VALUES ($1, $2)", [
        "USER_RENAME",
        `userId=${id} newName=${newName.trim()}`,
      ]);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }
}
