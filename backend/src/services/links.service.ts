import sql from "../db/db.js";

const LINK_COLUMNS = sql`
id,
slug,
destination_url AS "destinationUrl"
`;

export const linkService = {
  getLinkBySlug: async (slug: string) => {
    const result =
      await sql`SELECT ${LINK_COLUMNS} FROM links WHERE slug=${slug}`;
    return result[0];
  },

  getAllLinks: async () => {
    const result = await sql`SELECT ${LINK_COLUMNS} FROM links`;
    return result;
  },

  getDestinationUrl: async (slug: string) => {
    const result =
      await sql`SELECT destination_url FROM links WHERE slug=${slug}`;
    return result[0].destination_url;
  },

  createLink: async (slug: string, destinationUrl: string) => {
    const newSlug = slug.trim();
    const newUrl = destinationUrl.trim();

    if (newSlug.length === 0 || newUrl.length === 0) {
      return { failure: "empty" };
    }
    const result =
      await sql`SELECT ${LINK_COLUMNS} FROM links WHERE slug=${newSlug}`;
    if (result.length !== 0) {
      return { failure: "duplicate" };
    }
    await sql`INSERT INTO links(slug,destination_url) VALUES (${newSlug},${newUrl})`;
    return { success: "Slug created successfully" };
  },

  deleteLink: async (slug: string) => {
    const newSlug = slug.trim();

    if (newSlug.length === 0) {
      return { failure: "empty" };
    }
    const result =
      await sql`SELECT ${LINK_COLUMNS} FROM links WHERE slug=${newSlug}`;
    if (result.length === 0) {
      return null;
    }
    await sql`DELETE FROM links WHERE slug=${newSlug}`;
    return { success: "Slug deleted successfully" };
  },

  updateLink: async (slug: string, newSlug: string, newUrl: string) => {
    const currentSlug = slug.trim();
    const updatedSlug = newSlug.trim();
    const updatedUrl = newUrl.trim();

    if (
      currentSlug.length === 0 ||
      updatedSlug.length === 0 ||
      updatedUrl.length === 0
    ) {
      return { failure: "empty" };
    }
    const current =
      await sql`SELECT ${LINK_COLUMNS} FROM links WHERE slug=${currentSlug}`;
    if (current.length === 0) {
      return null;
    }
    const updated =
      await sql`SELECT ${LINK_COLUMNS} FROM links WHERE slug=${updatedSlug}`;
    if (current[0].slug === updatedSlug) {
      await sql`UPDATE links SET destination_url=${updatedUrl} WHERE slug=${updatedSlug}`;
      return { success: "Updated successfully" };
    }
    if (updated.length !== 0) {
      return { failure: "duplicate" };
    }
    await sql`UPDATE links SET slug=${updatedSlug}, destination_url=${updatedUrl} WHERE slug=${currentSlug}`;
    return { success: "Updated successfully" };
  },
};
