import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(
    "=================================== Unexpected Error =====================================",
  );
  console.error("\nTime    :", new Date().toISOString());
  console.error("Method  :", req.method);
  console.error("URL     :", req.originalUrl);
  if (err instanceof AppError) {
    console.error("\nType    :", err.name);
    console.error("Message :", err.message);
    console.error("Status  :", err.statusCode);
    console.error("\nStack   :", err.stack);
    console.error(
      "==========================================================================================",
    );
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof Error) {
    console.error("\nType    :", err.name);
    console.error("Message :", err.message);
    console.error("\nStack   :", err.stack);
    // console.error("\nError message:", err);
  } else {
    console.error("\nThrown Error :", err);
  }
  console.error(
    "==========================================================================================",
  );
  return res.status(500).json({ error: "Internal server error" });
};
