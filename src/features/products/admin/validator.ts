import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  image: z.any(),
  description: z.string(),
  quantity: z.number(),
});

export const updateProductSchema = addProductSchema.partial();
