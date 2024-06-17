import { image } from "@/features/shared/validators/image";
import { z } from "zod";

const productBaseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  image: z.any(),
  description: z.string(),
  quantity: z.number(),
});

export const addProductSchema = productBaseSchema;

export const updateProductSchema = productBaseSchema.partial();
