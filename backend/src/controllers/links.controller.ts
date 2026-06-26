import { Request, Response } from "express";
import { linkService } from "../services/links.service.js";

export const createLink = (req: Request, res: Response) => {
  try {
    const { slug, destinationUrl } = req.body;

    if (typeof slug !== "string" || typeof destinationUrl !== "string") {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl must be strings" });
    }
    const result = linkService.createLink(slug, destinationUrl);

    if (result.failure === "empty") {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl cannot be empty" });
    }

    if (result.failure === "duplicate") {
      return res.status(409).json({ message: `Slug ${slug} already exists` });
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: "Unknown error...",
    });
  }
};

export const listLinks = (req: Request, res: Response) => {
  try {
    const result = linkService.getAllLinks();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: "Unknown error...",
    });
  }
};

export const getLink = (req: Request, res: Response) => {
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
    console.error(error);

    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: "Unknown error...",
    });
  }
};
