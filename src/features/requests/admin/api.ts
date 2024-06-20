import prisma from "@/features/shared/db";
import { z } from "zod";
import { addRequestSchema, updateRequestSchema } from "./validator";

export const addRequest = async (input: z.infer<typeof addRequestSchema>) => {
  const user = await prisma.user.findUnique({
    where: {
      id: input.userId,
    },
  });

  if (!user) {
    throw new Error(`User not found with ID: ${input.userId}`);
  }

  const product = await prisma.product.findUnique({
    where: {
      id: input.productId,
    },
  });

  if (!product) {
    throw new Error(`Product not found with ID: ${input.productId}`);
  }

  if (product.quantity <= 0) {
    throw new Error(`Product is out of stock`);
  }

  await prisma.request.create({
    data: {
      ...input,
    },
  });
};

export const updateRequest = async (
  input: z.infer<typeof updateRequestSchema>
) => {
  const existingRequest = await prisma.request.findUnique({
    where: {
      id: input.requestId,
    },
  });

  if (!existingRequest) {
    throw new Error(`Request not found with ID: ${input.requestId}`);
  }

  const updatedRequest = await prisma.request.update({
    where: {
      id: input.requestId,
    },
    data: {
      status: input.status,
      reason: input.reason,
      rejectionReason: input.rejectionReason,
    },
  });

  return updatedRequest;
};

export const deleteRequest = async (id: number) => {
  const existingRequest = await prisma.request.delete({
    where: {
      id,
    },
  });

  if (!existingRequest) {
    throw new Error(`Request not found with ID: ${id}`);
  }
};
