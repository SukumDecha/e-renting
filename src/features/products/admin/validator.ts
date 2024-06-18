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
