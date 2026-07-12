import { z } from "zod";

export const updateLinkSchema = z.object({
  slug: z.string(),
  destinationUrl: z.url(),
});
