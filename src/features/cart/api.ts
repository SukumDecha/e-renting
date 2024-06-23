import prisma from "@/features/shared/db";
import { z } from "zod";
import { addCartSchema, updateCartSchema } from "./validator";

export const findAll = async (userId: number) => {
  return await prisma.cart.findMany({
    where: { userId },
    select: {
      id: true,
      userId: true,
      amount: true,
      productId: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
};

export const findById = async (id: number) => {
  return await prisma.cart.findUnique({
    where: { id },
  });
};

export const addCart = async (
  userId: number,
  input: z.infer<typeof addCartSchema>
) => {
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
      productId: input.productId,
    },
  });

  if (cart) {
    throw new Error(`This product is already in your cart`);
  }

  return await prisma.cart.create({
    data: { userId, ...input },
  });
};

export const updateCart = async (
  id: number,
  input: z.infer<typeof updateCartSchema>
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: input.productId,
    },
    select: {
      quantity: true,
    },
  });

  if (!product) {
    throw new Error(`Product doesn't exist with ID: ${id}`);
  }

  if (product.quantity < input.quantity) {
    throw new Error(`Product out of stock...`);
  }

  const updatedCart = await prisma.cart.update({
    where: { id },
    data: { amount: input.quantity },
  });

  if (!updatedCart) {
    throw new Error(`Cart not found with ID: ${id}`);
  }

  return updatedCart;
};

export const deleteCart = async (id: number) => {
  const deletedCart = await prisma.cart.delete({
    where: { id },
  });

  if (!deletedCart) {
    throw new Error(`Cart not found with ID: ${id}`);
  }
};
