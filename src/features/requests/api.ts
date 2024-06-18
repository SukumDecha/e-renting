import prisma from "../shared/db";

interface FindAllParams {
  userId: number;
  limit: number | undefined;
}

export const findAll = async ({ userId, limit }: FindAllParams) => {
  const products = await prisma.request.findMany({
    select: {
      id: true,
      status: true,
      reason: true,
      updatedAt: true,
    },
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit == -1 ? undefined : limit,
  });

  return products;
};

export const findById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};
