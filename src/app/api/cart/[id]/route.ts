import { deleteCart, findById, updateCart } from "@/features/cart/api";
import { IUpdateCart } from "@/features/cart/type";
import { updateCartSchema } from "@/features/cart/validator";

interface PathParams {
  params: {
    id: string;
  };
}

export const GET = async (_req: Request, { params: { id } }: PathParams) => {
  const cart = await findById(+id);

  return Response.json(cart);
};

export const PATCH = async (req: Request, { params: { id } }: PathParams) => {
  const body = await (req.json() as Promise<IUpdateCart>);

  try {
    const form = await updateCartSchema.parseAsync(body);
    const leave = await updateCart(+id, form);
    return Response.json(leave);
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 422,
    });
  }
};

export const DELETE = async (_req: Request, { params: { id } }: PathParams) => {
  const cart = await deleteCart(+id);

  if (cart === null) {
    return new Response(`Cart not found`, {
      status: 404,
    });
  }

  return new Response(null, {
    status: 204,
  });
};
