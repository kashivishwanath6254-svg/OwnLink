import { z } from "zod";

export const createLinkSchema = z.object({
  slug: z.string(),
  destinationUrl: z.url(),
});
