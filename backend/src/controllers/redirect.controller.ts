import type { NextFunction, Request, Response } from "express";
import type { SlugParams } from "../schemas/index.js";
import { linkService } from "../services/links.service.js";

export const redirectSlug = async (
  req: Request<SlugParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await linkService.getDestinationUrl(slug);
    return res.redirect(result);
  } catch (error) {
    return next(error);
  }
};
