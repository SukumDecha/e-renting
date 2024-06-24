import prisma from "../shared/db";

interface FindAllParams {
  userId: number;
  limit?: number;
  isAdmin?: boolean;
}

export const findAll = async ({
  userId,
  limit = -1,
  isAdmin = false,
}: FindAllParams) => {
  const selectFields = {
    id: true,
    status: true,
    reason: true,
    updatedAt: true,
    user: isAdmin ? { select: { name: true, image: true } } : false,
    product: {
      select: {
        name: true,
        image: true,
      },
    },
    productQuantity: true,
  };

  const whereClause = isAdmin ? undefined : { userId };

  const orderBy = { updatedAt: "desc" as const };

  const take = limit === -1 ? undefined : limit;

  const products = await prisma.request.findMany({
    select: selectFields,
    where: whereClause,
    orderBy,
    take,
  });

  return products;
};

export const findById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  return product;
};
