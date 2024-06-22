import prisma from "@/features/shared/db";
import { z } from "zod";
import { addCartSchema, updateCartSchema } from "./validator";

export const findAll = async (userId: number) => {
  return await prisma.cart.findMany({
    where: { userId },
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
  return await prisma.cart.create({
    data: { userId, ...input },
  });
};

export const updateCart = async (
  id: number,
  input: z.infer<typeof updateCartSchema>
) => {
  const updatedCart = await prisma.cart.update({
    where: { id },
    data: { amount: input.amount },
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
