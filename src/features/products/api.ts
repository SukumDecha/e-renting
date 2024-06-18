import prisma from "../shared/db";
import { IProduct } from "./admin/type";

interface FindAllParams {
  limit?: number | undefined;
}
export const findAll = async ({ limit }: FindAllParams = {}) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      description: true,
      quantity: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit,
  });

  return products;
};

export const findBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      description: true,
      quantity: true,
      updatedAt: true,
    },
  });

  return product;
};
