import { pool } from "../api/DBConnection.js";
import { AppError } from "../errors/AppError.js";
import type { ListRow, nameRow, UserRow } from "../util/types.js";
import { io } from "../server.js";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}

export const enterQueue = async (id: number): Promise<void> => {
  try {
    await pool.query<ListRow>("INSERT INTO jns.queue(user_id) VALUES ($1)", [
      id,
    ]);

    io.emit("queueUpdated");
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new AppError("User is already in the queue", 400);
    }
    throw err;
  }
};

export const exitQueue = async (id: number): Promise<void> => {
  try {
    await pool.query<ListRow>("DELETE FROM jns.queue WHERE user_id = $1", [id]);

    io.emit("queueUpdated");
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new AppError("User is already out of the queue", 400);
    }

    throw err;
  }
};

export const getQueue = async (): Promise<nameRow[]> => {
  try {
    const r = await pool.query<nameRow>(
      "SELECT u.name, q.enter_time FROM jns.queue q JOIN jns.users u ON q.user_id = u.id ORDER BY q.enter_time ASC",
    );
    return r.rows;
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      return [];
    }
    throw err;
  }
};
