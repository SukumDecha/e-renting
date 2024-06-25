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
    rejectionReason: true,
    productQuantity: true,
    returnDate: true,
    requestDate: true,
    user: isAdmin ? { select: { name: true, image: true } } : false,
    product: {
      select: {
        name: true,
        image: true,
      },
    },
  };

  const whereClause = isAdmin ? undefined : { userId };

  const orderBy = { updatedAt: "desc" as const };

  const take = limit === -1 ? undefined : limit;

  const request = await prisma.request.findMany({
    select: selectFields,
    where: whereClause,
    orderBy,
    take,
  });

  return request;
};

export const findById = async (id: number) => {
  const request = await prisma.request.findUnique({
    where: { id },
  });

  return request;
};
