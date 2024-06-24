import prisma from "@/features/shared/db";
import { z } from "zod";
import { addRequestSchema, updateRequestSchema } from "./validator";

export const addRequest = async (
  userId: number,
  input: z.infer<typeof addRequestSchema>
) => {
  const [user, product] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.product.findUnique({ where: { id: input.productId } }),
  ]);

  if (!user) throw new Error(`User not found with ID: ${userId}`);
  if (!product)
    throw new Error(`Product not found with ID: ${input.productId}`);

  if (product.quantity <= 0) throw new Error(`Product is out of stock`);

  const cart = await prisma.cart.delete({
    where: {
      userId_productId: {
        userId,
        productId: input.productId,
      },
    },
  });

  if (!cart)
    throw new Error(
      `Cart not found for user ID: ${userId} and product ID: ${input.productId}`
    );

  await prisma.request.create({
    data: {
      userId,
      productId: input.productId,
      productQuantity: cart.amount,
      reason: input.reason,
      requestDate: input.requestDate,
      returnDate: input.returnDate,
    },
  });
};

export const updateRequest = async (
  id: number,
  input: z.infer<typeof updateRequestSchema>
) => {
  const existingRequest = await prisma.request.findUnique({
    where: { id },
  });

  if (!existingRequest) throw new Error(`Request not found with ID: ${id}`);

  if (input.status === "REJECTED" && !input.rejectionReason) {
    throw new Error(`Rejection reason is required when status is REJECTED`);
  }

  await prisma.product.update({
    where: { id: existingRequest.productId },
    data: {
      quantity: {
        decrement: existingRequest.productQuantity,
      },
    },
  });

  return await prisma.request.update({
    where: { id },
    data: {
      status: input.status,
      rejectionReason: input.rejectionReason,
    },
  });
};

export const deleteRequest = async (id: number) => {
  const existingRequest = await prisma.request.delete({ where: { id } });

  if (!existingRequest) throw new Error(`Request not found with ID: ${id}`);
};
