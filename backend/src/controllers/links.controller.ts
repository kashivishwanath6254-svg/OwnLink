import { Request, Response, NextFunction } from "express";
import { linkService } from "../services/links.service.js";

export const createLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug, destinationUrl } = req.body;

    if (typeof slug !== "string" || typeof destinationUrl !== "string") {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl must be strings" });
    }
    const result = await linkService.createLink(slug, destinationUrl);

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const listLinks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await linkService.getAllLinks();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;

    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "Slug type not valid" });
    }

    const result = await linkService.getLinkBySlug(slug);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug: currentSlug } = req.params;
    const { slug, destinationUrl } = req.body;

    if (Array.isArray(currentSlug)) {
      return res.status(400).json({ message: "Slug type not valid" });
    }

    if (typeof slug !== "string" || typeof destinationUrl !== "string") {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl must be strings" });
    }

    const result = await linkService.updateLink(
      currentSlug,
      slug,
      destinationUrl,
    );

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "Slug must be a string" });
    }
    const result = await linkService.deleteLink(slug);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
