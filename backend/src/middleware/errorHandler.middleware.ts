import { Request, Response, NextFunction } from "express";

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
  if (err instanceof Error) {
    console.error("\nType    :", err.name);
    console.error("Message :", err.message);
    console.error("\nStack   :", err.stack);
  } else {
    console.error("\nThrown Error :", err);
  }
  console.error(
    "==========================================================================================",
  );
  // console.log(req);
  return res.status(500).json({ error: "Internal server error" });
};
