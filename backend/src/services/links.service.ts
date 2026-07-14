import postgres from "postgres";
import sql from "../db/db.js";
import AppError from "../errors/AppError.js";

const LINK_COLUMNS = sql`
id,
slug,
destination_url AS "destinationUrl"
`;

export const linkService = {
  getLinkBySlug: async (slug: string) => {
    const trimmedSlug = slug.trim();
    const result =
      await sql`SELECT ${LINK_COLUMNS} FROM links WHERE slug=${trimmedSlug}`;
    if (result.length === 0) {
      throw new AppError(404, "Slug not found");
    }
    return result[0];
  },

  getAllLinks: async () => {
    const result = await sql`SELECT ${LINK_COLUMNS} FROM links`;
    return result;
  },

  getDestinationUrl: async (slug: string) => {
    const trimmedSlug = slug.trim();
    const result =
      await sql`SELECT destination_url FROM links WHERE slug=${trimmedSlug}`;
    if (result.length === 0) {
      throw new AppError(404, "Slug not found");
    }
    return result[0].destination_url;
  },

  createLink: async (slug: string, destinationUrl: string) => {
    const newSlug = slug.trim();
    const newUrl = destinationUrl.trim();

    try {
      await sql`INSERT INTO links(slug,destination_url) VALUES (${newSlug},${newUrl})`;
    } catch (err) {
      if (err instanceof postgres.PostgresError) {
        if (err.code === "23505") {
          throw new AppError(409, "Slug already exists");
        }

        if (err.code === "23514") {
          if (err.constraint_name === "links_slug_not_blank") {
            throw new AppError(400, "Slug cannot be empty");
          }

          if (err.constraint_name === "links_destination_url_not_blank") {
            throw new AppError(400, "Destination URL cannot be empty");
          }
        }
      }
      throw err;
    }
    return { success: "Slug created successfully" };
  },

  deleteLink: async (slug: string) => {
    const trimmedSlug = slug.trim();

    try {
      const result = await sql`DELETE FROM links WHERE slug=${trimmedSlug}`;
      if (result.count === 0) {
        throw new AppError(404, "Slug not found");
      }
    } catch (err) {
      if (err instanceof postgres.PostgresError) {
        if (err.code === "23514") {
          if (err.constraint_name === "links_slug_not_blank") {
            throw new AppError(400, "Slug cannot be empty");
          }
        }
      }
      throw err;
    }
    return { success: "Slug deleted successfully" };
  },

  updateLink: async (
    slug: string,
    updates: { slug?: string; destinationUrl?: string },
  ) => {
    const currentSlug = slug.trim();

    const values: Record<string, string> = {};

    if (updates.slug !== undefined) {
      values.slug = updates.slug.trim();
    }

    if (updates.destinationUrl !== undefined) {
      values.destination_url = updates.destinationUrl.trim();
    }

    try {
      const result = await sql`
    UPDATE links
    SET ${sql(values)}
    WHERE slug = ${currentSlug}
  `;
      if (result.count === 0) {
        throw new AppError(404, "Slug not found");
      }
    } catch (err) {
      if (err instanceof postgres.PostgresError) {
        if (err.code === "23505") {
          throw new AppError(409, "Slug already exists");
        }

        if (err.code === "23514") {
          if (err.constraint_name === "links_slug_not_blank") {
            throw new AppError(400, "Slug cannot be empty");
          }

          if (err.constraint_name === "links_destination_url_not_blank") {
            throw new AppError(400, "Destination URL cannot be empty");
          }
        }
      }
      throw err;
    }
    return { success: "Updated successfully" };
  },
};
