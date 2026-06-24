import { Request, Response } from "express";
import linkStore from "../data/storage.js";

export const createLink = (req: Request, res: Response) => {
  try {
    const { slug, destinationUrl } = req.body;

    if (typeof slug !== "string" || typeof destinationUrl !== "string") {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl must be strings" });
    }

    const newSlug = slug.trim();
    const newUrl = destinationUrl.trim();

    if (newSlug.length === 0 || newUrl.length === 0) {
      return res
        .status(400)
        .json({ message: "slug and destinationUrl cannot be empty" });
    }

    if (linkStore[newSlug]) {
      return res
        .status(409)
        .json({ message: `Slug ${newSlug} already exists` });
    }

    linkStore[newSlug] = { destinationUrl: newUrl };

    return res.status(201).json({ message: "Slug created successfully" });
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
  return res.status(200).json({
    links: linkStore,
  });
};

export const getLink = (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "Slug type not valid" });
    }

    if (!linkStore[slug]) {
      return res.status(404).json({ message: "Slug not found" });
    }
    const destinationUrl = linkStore[slug].destinationUrl;
    return res.status(200).json({ slug, destinationUrl });
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
