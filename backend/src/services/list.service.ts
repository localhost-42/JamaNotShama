import { pool } from "../api/DBConnection";
import { AppError } from "../errors/appError";
import { type QueryResult } from "pg";

function isPgUniqueViolation(err: unknown): boolean {
  // pg error code for unique_violation
  return (
    typeof err === "object" && err !== null && (err as any).code === "23505"
  );
}
