import { z } from "zod";
import { slugSchema, destinationUrlSchema } from "./common.schema.js";

export const createLinkSchema = z.object({
  destinationUrl: destinationUrlSchema,
}).strict();
export type CreateLinkBody = z.infer<typeof createLinkSchema>;

export const updateLinkSchema = z
  .object({
    destinationUrl: destinationUrlSchema,
  })
  .strict()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export type UpdateLinkBody = z.infer<typeof updateLinkSchema>;

export const slugParamSchema = z.object({
  slug: slugSchema,
});
export type SlugParams = z.infer<typeof slugParamSchema>;
