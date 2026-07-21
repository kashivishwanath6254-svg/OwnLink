import type { Request } from "express";

type LogTitle =
  | "Application Error"
  | "Client Error"
  | "Unexpected Error";

type LogErrorOptions = {
  title: LogTitle;
  req: Request;
  error: Error;
  status?: number;
};

export function logError({
  title,
  req,
  error,
  status,
}: LogErrorOptions) {
  console.error(
    `=================================== ${title} =====================================`,
  );

  console.error("\nTime    :", new Date().toISOString());
  console.error("Method  :", req.method);
  console.error("URL     :", req.originalUrl);

  console.error("\nType    :", error.name);
  console.error("Message :", error.message);

  if (status !== undefined) {
    console.error("Status  :", status);
  }

  console.error("\nStack   :", error.stack);

  console.error(
    "==========================================================================================",
  );
}
