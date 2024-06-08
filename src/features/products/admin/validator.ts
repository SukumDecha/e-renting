import { z } from "zod";

const productBaseSchema = z.object({
  name: z.string(),
  id: z.number(),
  slug: z.string(),
  image: z.string(),
  description: z.string(),
  totalAmount: z.number(),
  currentAmount: z.number(),
  updatedAt: z.date(),
});

// Schema for adding a product (requires all fields)
export const addProductSchema = productBaseSchema;

// Schema for updating a product (partial updates allowed)
export const updateProductSchema = productBaseSchema.partial();
