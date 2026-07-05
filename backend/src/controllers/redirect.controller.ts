import { NextFunction, Request, Response } from "express";
import { linkService } from "../services/links.service.js";

export const redirectSlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "slug type not valid" });
    }
    const result = await linkService.getDestinationUrl(slug);
    return res.redirect(result);
  } catch (error) {
    return next(error);
  }
};
