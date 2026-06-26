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
  deleteLink: (slug: string) => {
    const newSlug = slug.trim();

    if (newSlug.length === 0) {
      return { failure: "empty" };
    }
    if (!linkStore[newSlug]) {
      return null;
    }
    delete linkStore[newSlug];
    return { success: "Slug deleted successfully" };
  },
  updateLink: (slug: string, newSlug: string, newUrl: string) => {
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

    if (!linkStore[currentSlug]) {
      return null;
    }
    if (linkStore[updatedSlug]) {
      if (currentSlug === updatedSlug) {
        linkStore[currentSlug] = { destinationUrl: updatedUrl };
        return { success: "Slug updated successfully" };
      } else {
        return { failure: "duplicate" };
      }
    }
    delete linkStore[currentSlug];
    linkStore[updatedSlug] = { destinationUrl: updatedUrl };

    return { success: "Slug updated successfully" };
  },
};
