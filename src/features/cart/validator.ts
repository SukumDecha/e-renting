import { z } from "zod";

export const addCartSchema = z.object({
  productId: z.number(),
  amount: z.number(),
});

export const updateCartSchema = z.object({
  amount: z.number().int().gt(1, { message: "Amount must be greater than 1" }),
});
