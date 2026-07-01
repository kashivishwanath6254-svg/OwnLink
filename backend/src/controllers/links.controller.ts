import { Request, Response, NextFunction } from "express";
import { linkService } from "../services/links.service.js";

export const createLink = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug, destinationUrl } = req.body;

    if (typeof slug !== "string" || typeof destinationUrl !== "string") {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl must be strings" });
    }
    const result = linkService.createLink(slug, destinationUrl);

    if (result?.failure === "empty") {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl cannot be empty" });
    }

    if (result?.failure === "duplicate") {
      return res.status(409).json({ message: `Slug ${slug} already exists` });
    }

    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

export const listLinks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = linkService.getAllLinks();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const getLink = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "Slug type not valid" });
    }

    const result = linkService.getLinkBySlug(slug);

    if (!result) {
      return res.status(404).json({ message: "Slug not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateLink = (req: Request, res: Response, next: NextFunction) => {
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

    const result = linkService.updateLink(currentSlug, slug, destinationUrl);

    if (!result) {
      return res.status(404).json({ message: "Slug not found" });
    }
    if (result?.failure === "empty") {
      return res.status(400).json({ message: "body can't be empty string" });
    }
    if (result?.failure === "duplicate") {
      return res.status(409).json({ message: "Slug already exists" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteLink = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "Slug must be a string" });
    }
    const result = linkService.deleteLink(slug);
    if (!result) {
      return res.status(404).json({ message: "Slug not found" });
    }
    if (result.failure === "empty") {
      return res.status(400).json({ message: "Slug cannot be empty" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
