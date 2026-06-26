import linkStore from "../data/storage.js";

export const linkService = {
  getLinkBySlug: (slug: string) => {
    if (!linkStore[slug]) {
      return null;
    }
    const destinationUrl = linkStore[slug].destinationUrl;
    return { slug, destinationUrl };
  },
  getAllLinks: () => {
    return linkStore;
  },
  getDestinationUrl: (slug: string) => {
    if (!linkStore[slug]) {
      return null;
    }
    return linkStore[slug].destinationUrl;
  },
  createLink: (slug: string, destinationUrl: string) => {
    const newSlug = slug.trim();
    const newUrl = destinationUrl.trim();

    if (newSlug.length === 0 || newUrl.length === 0) {
      return { failure: "empty" };
    }
    if (linkStore[newSlug]) {
      return { failure: "duplicate" };
    }
    linkStore[newSlug] = { destinationUrl: newUrl };
    return { success: "Slug created successfully" };
  },
};
