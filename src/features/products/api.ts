import prisma from "../shared/db";

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
      totalAmount: true,
      currentAmount: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: limit,
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
