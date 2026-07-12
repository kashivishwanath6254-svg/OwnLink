import { Request, Response, NextFunction } from "express";
import { linkService } from "../services/links.service.js";

export const createLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug, destinationUrl } = req.body;

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
    const { slug } = req.params as { slug: string };

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
    const { slug: currentSlug } = req.params as { slug: string };
    const { slug, destinationUrl } = req.body;

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
    const { slug } = req.params as { slug: string };

    const result = await linkService.deleteLink(slug);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
