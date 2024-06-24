import { z } from "zod";

const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const addRequestSchema = z.object({
  productId: z.number(),
  productQuantity: z
    .number()
    .min(1, { message: "Product amount must be at least 1" }),
  reason: z
    .string()
    .min(8, {
      message: "Reason must be at least 8 characters long",
    })
    .max(200, {
      message: "Reason can't be longer than 200 characters long",
    }),
  rejectionReason: z
    .string()
    .min(8, {
      message: "Reason must be at least 8 characters long",
    })
    .max(200, {
      message: "Reason can't be longer than 200 characters long",
    })
    .optional(),
  requestDate: z.string().refine((value) => isoDateTimeRegex.test(value), {
    message:
      "Invalid DateTime format. Expected format: YYYY-MM-DDTHH:MM:SS.sssZ",
  }),
  returnDate: z.string().refine((value) => isoDateTimeRegex.test(value), {
    message:
      "Invalid DateTime format. Expected format: YYYY-MM-DDTHH:MM:SS.sssZ",
  }),
});

export const updateRequestSchema = addRequestSchema
  .extend({
    status: z.enum(["PENDING", "APPROVED", "REJECTED", "RETURNED"]),
  })
  .partial({
    rejectionReason: true,
  });
