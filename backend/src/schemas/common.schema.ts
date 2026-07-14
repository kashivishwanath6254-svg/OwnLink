import { z } from "zod";

export const slugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(50, "Slug cannot be longer than 50 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Slug may only contain letters, numbers, hyphens (-), and underscores (_)",
  );

export const destinationUrlSchema = z
  .url({ error: "Destination URL must be a valid URL" })
  .trim();
