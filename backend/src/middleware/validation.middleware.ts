import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

type RequestProperty = "body" | "params";

export function validate(schema: ZodType, property: RequestProperty) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        if (issue.code === "unrecognized_keys") {
          return {
            field: "body",
            message: `Unknown field(s): ${issue.keys.join(", ")}`,
          };
        }
        return {
          field: issue.path.join(".") || "body",
          message: issue.message,
        };
      });

      res.status(400).json({
        message: "Request validation failed",
        errors,
      });
      return;
    }

    req[property] = result.data;
    next();
  };
}
