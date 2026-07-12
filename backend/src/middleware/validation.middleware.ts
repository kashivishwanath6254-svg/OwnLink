import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

type ResquestProperty = "body" | "params";

export function validate(schema: ZodType, property: ResquestProperty) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      res.status(400).json({
        message: "Request validation failed",
        errors: result.error.issues,
      });
      return;
    }

    req[property] = result.data;
    next();
  };
}
