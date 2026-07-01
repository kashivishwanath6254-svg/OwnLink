import { NextFunction, Request, Response } from "express";
import { linkService } from "../services/links.service.js";

export const redirectSlug = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "slug type not valid" });
    }
    const result = linkService.getDestinationUrl(slug);
    if (!result) {
      return res.status(404).json({ message: "No link found" });
    }
    return res.redirect(result);
  } catch (error) {
    return next(error);
  }
};
