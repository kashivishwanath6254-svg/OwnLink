import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";
import { logError } from "../utils/logger.js";

type ExpressHttpError = Error & {
  status?: number;
  type?: string;
};

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
    });
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof Error) {
    const httpError: ExpressHttpError = err;

    if (httpError.status === 400 && httpError.type === "entity.parse.failed") {
      logError({
        title: "Client Error",
        req,
        error: err,
        status: httpError.status,
      });
      return res.status(httpError.status).json({ message: "Malformed JSON" });
    }

    if (httpError.status === 413) {
      logError({
        title: "Client Error",
        req,
        error: err,
        status: httpError.status,
      });
      return res.status(httpError.status).json({
        message: "Request body is too large.",
      });
    }

    logError({
      title: "Unexpected Error",
      req,
      error: err,
    });
    return res.status(500).json({ message: "Internal server error" });
  } else {
    console.error("\nThrown Error :", err);
  }
  return res.status(500).json({ message: "Internal server error" });
};
