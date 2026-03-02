import { pool } from "../api/DBConnection.js";
import { AppError } from "../errors/AppError.js";
import type { ListRow, UserRow } from "../util/types.js";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}


export const enterList = async (id: number): Promise<void> => {
  try {
    await pool.query<ListRow>(
      "INSERT INTO list(user_id, exit_time) VALUES ($1, $2)",
      [id, null],
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
      "UPDATE list SET exit_time = NOW() WHERE user_id = $1 AND exit_time IS NULL",
      [id],
    );
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new AppError("User is already out of the list", 400);
    }

    throw err;
  }
};


export const enterQueue = async (id: number): Promise<void> => {
  try {
   await pool.query<ListRow>(
      "INSERT INTO queue(user_id, exit_time) VALUES ($1, $2)",
      [id, null],
    );
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new AppError("User is already in the queue", 400);
    }
    throw err;
  }
};

export const exitQueue = async (id: number): Promise<void> => {
  try {
    await pool.query<ListRow>(
      "DELETE FROM queue WHERE user_id = $1",
      [id],
    );
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      throw new AppError("User is already out of the queue", 400);
    }

    throw err;
  }
};



export const getList = async (): Promise<string[]> => {
  try {
    const r = await pool.query<ListRow & UserRow>(
      "SELECT u.name FROM list l JOIN users u ON l.user_id = u.user_id WHERE l.exit_time IS NULL ORDER BY l.enter_time ASC",
    );
    return r.rows.map((row) => row.name);
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      return [];
    }
    throw err;
  } 
};

export const getQueue = async (): Promise<string[]> => {
  try {
    const r = await pool.query<ListRow & UserRow>(
      "SELECT u.name FROM queue q JOIN users u ON q.user_id = u.user_id WHERE q.exit_time IS NULL ORDER BY q.enter_time ASC",
    );
    return r.rows.map((row) => row.name);
  } catch (err) {
    if (isPgUniqueViolation(err)) {
      return [];
    }   
    throw err;  
  }
};