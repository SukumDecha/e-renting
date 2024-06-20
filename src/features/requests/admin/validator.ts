import { z } from "zod";

const sqlDateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const addRequestSchema = z.object({
  userId: z.number(),
  productId: z.number(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "RETURNED"]),
  reason: z
    .string()
    .min(8, {
      message: "Reason must be atleast 8 characters long",
    })
    .max(200, {
      message: "Reason can't be longer than 200 characters long",
    }),
  rejectionReason: z
    .string()
    .min(8, {
      message: "Reason must be atleast 8 characters long",
    })
    .max(200, {
      message: "Reason can't be longer than 200 characters long",
    })
    .optional(),
  requestDate: z.string().refine((value) => sqlDateTimeRegex.test(value), {
    message: "Invalid DateTime format. Expected format: YYYY-MM-DD HH:MM:SS",
  }),
});

export const updateRequestSchema = addRequestSchema
  .extend({
    requestId: z
      .number()
      .min(1, { message: "Request ID must be a positive integer" }),
  })
  .partial({
    status: true,
    reason: true,
    rejectionReason: true,
  });
