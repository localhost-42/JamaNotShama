import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {

  if (err instanceof AppError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
      code: err.code ?? null,
    });
  }

  // Postgres unique violation
  if (
    typeof err === "object" &&
    err !== null &&
    (err as any).code === "23505"
  ) {
    return res.status(409).json({
      success: false,
      error: "Duplicate value",
      code: "DUPLICATE",
    });
  }

  // Validation error (דוגמה כללית)
  if (
    typeof err === "object" &&
    err !== null &&
    (err as any).name === "ValidationError"
  ) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
    });
  }

  // Unknown error
  console.error("Unhandled Error:", err);

  return res.status(500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : ((err as any)?.message ?? "Internal Server Error"),
  });
}
