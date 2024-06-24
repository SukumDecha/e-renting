import { getServerAuthSession } from "@/features/auth/auth";
import { addCart, findAll } from "@/features/cart/api";
import { IAddCart } from "@/features/cart/type";
import { addCartSchema } from "@/features/cart/validator";

export const GET = async () => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: "Please Login" }, { status: 401 });

  const carts = await findAll(+session.user.id);

  return Response.json(carts);
};

export const POST = async (req: Request) => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: "Please Login" }, { status: 401 });

  const body = await (req.json() as Promise<IAddCart>);

  try {
    const form = await addCartSchema.parseAsync(body);
    const cart = await addCart(+session.user.id, form);
    return new Response(JSON.stringify(cart), {
      status: 201,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ err: error.message }), {
      status: 422,
    });
  }
};
