import { z } from "zod";

export const addCartSchema = z.object({
  productId: z.number(),
  amount: z.number(),
});

export const updateCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().int().gt(0, { message: "Quantity must be greater than 0" }),
});
