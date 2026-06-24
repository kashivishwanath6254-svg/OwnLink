import { Request, Response } from "express";
import linkStore from "../data/storage.js";

export const createLink = (req: Request, res: Response) => {
  try {
    const { slug, destinationUrl } = req.body;
    if (typeof slug !== "string" || typeof destinationUrl !== "string") {
      return res.status(400).json({ message: "Valid body was not found" });
    }
    if (linkStore[slug]) {
      return res.status(409).json({ message: `Slug ${slug} already exists` });
    }
    linkStore[slug] = { destinationUrl };
    return res.status(201).json({ message: "Slug created succesfully" });
  } catch (error) {
    return console.log(error);
  }
};
