export const slugify = (input: string) => {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except hyphens
    .replace(/\-\-+/g, "-") // Replace multiple consecutive hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};
