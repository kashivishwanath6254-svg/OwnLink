import type { Request, Response, NextFunction } from "express";
import type {
  CreateLinkBody,
  SlugParams,
  UpdateLinkBody,
} from "../schemas/index.js";
import { linkService } from "../services/links.service.js";

export const createLink = async (
  req: Request<Record<string, never>, unknown, CreateLinkBody>,
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
  req: Request<SlugParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;

    const result = await linkService.getLinkBySlug(slug);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const updateLink = async (
  req: Request<SlugParams, unknown, UpdateLinkBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug: currentSlug } = req.params;

    const result = await linkService.updateLink(currentSlug, req.body);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const deleteLink = async (
  req: Request<SlugParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;

    const result = await linkService.deleteLink(slug);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
