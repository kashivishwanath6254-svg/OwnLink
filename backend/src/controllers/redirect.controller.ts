import { Request, Response } from "express";
import linkStore from "../data/storage.js";

export const redirectSlug = (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    if (Array.isArray(slug)) {
      return res.status(400).json({ message: "slug type not valid" });
    }
    if (!linkStore[slug]) {
      return res.status(404).json({ message: "No link found" });
    }
    const redirectURL = linkStore[slug].destinationUrl;
    return res.redirect(redirectURL);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
