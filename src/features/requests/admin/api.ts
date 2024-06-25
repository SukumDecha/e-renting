import prisma from "@/features/shared/db";
import { z } from "zod";
import { addRequestSchema, updateRequestSchema } from "./validator";
import { findById } from "../api";
import { revalidatePath } from "next/cache";
import { deleteCart } from "@/features/cart/api";
import { updateQuantity as updateProductQuantity } from "@/features/products/admin/api";

const validateUserAndProduct = async (userId: number, productId: number) => {
  const [user, product] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { id: true } }),
    prisma.product.findUnique({
      where: { id: productId },
      select: { quantity: true },
    }),
  ]);

  if (!user) throw new Error(`User not found with ID: ${userId}`);
  if (!product) throw new Error(`Product not found with ID: ${productId}`);
  if (product.quantity <= 0) throw new Error(`Product is out of stock`);

  return { user, product };
};

export const addRequest = async (
  userId: number,
  input: z.infer<typeof addRequestSchema>
) => {
  await validateUserAndProduct(userId, input.productId);

  await deleteCart(input.cartId);

  const request = prisma.request.create({
    data: {
      userId,
      productId: input.productId,
      productQuantity: input.productQuantity,
      reason: input.reason,
      requestDate: input.requestDate,
      returnDate: input.returnDate,
    },
  });

  revalidatePath("/api/request");
  return request;
};

export const updateRequest = async (
  id: number,
  input: z.infer<typeof updateRequestSchema>
) => {
  const { status, rejectionReason } = input;
  const existingRequest = await findById(id);

  if (!existingRequest) throw new Error(`Request not found with ID: ${id}`);

  if (status === "REJECTED" && !rejectionReason) {
    throw new Error(`Rejection reason is required when status is 'REJECTED'`);
  }

  await validateUserAndProduct(
    existingRequest.userId,
    existingRequest.productId
  );

  if (status === "APPROVED") {
    updateProductQuantity(
      existingRequest.productId,
      existingRequest.productQuantity,
      false
    );
  } else if (status === "RETURNED") {
    updateProductQuantity(
      existingRequest.productId,
      existingRequest.productQuantity,
      true
    );
  }
  
  const request = prisma.request.update({
    where: { id },
    data: {
      status: input.status,
      rejectionReason: input.rejectionReason,
    },
  });

  revalidatePath("/api/request");
  revalidatePath(`/api/request/${id}`);
  return request;
};

export const deleteRequest = async (id: number) => {
  const existingRequest = await findById(id);
  if (!existingRequest) throw new Error(`Request not found with ID: ${id}`);

  await prisma.request.delete({ where: { id } });
  revalidatePath("/api/request");
};
