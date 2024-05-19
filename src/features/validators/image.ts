import { z } from "zod";

const MAX_FILE_SIZE = 1_000 * 1_000;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// refile คือการทดสอบต่อจาก .custom
export const image = z
  .custom<File | null>((image) => image instanceof File, "Image is required")
  .refine(
    (image) => image && image.size <= MAX_FILE_SIZE,
    "Max file size is 1MB"
  )
  .refine(
    (image) => image && ACCEPTED_IMAGE_TYPES.includes(image.type),
    "Invalid image type (.jpeg, .jpg, .png, .webp)"
  );
