import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";
import { logError } from "../utils/logger.js";

type HttpError = Error & {
  status?: number
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    logError({
      title: "Application Error",
      req,
      error: err,
      status: err.statusCode,
    })
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof Error) {
    logError({
      title: "Unexpected Error",
      req,
      error: err,
    })
    return res.status(500).json({ message: "Internal server error" })
  } else {
    console.error("\nThrown Error :", err);
  }
  return res.status(500).json({ message: "Internal server error" });
};
