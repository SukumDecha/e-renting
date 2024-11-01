import { remove, update } from "@/features/products/admin/api";
import { IUpdateProduct } from "@/features/products/admin/type";
interface PathParams {
  params: {
    slug: string;
  };
}

export const PATCH = async (req: Request, { params: { slug } }: PathParams) => {
  const formData = await req.formData();

  try {
    const form: IUpdateProduct = {};
    if (formData.has("name")) form.name = formData.get("name") as string;
    if (formData.has("description"))
      form.description = formData.get("description") as string;
    if (formData.has("quantity"))
      form.quantity = parseInt(formData.get("quantity") as string, 10);
    if (formData.has("image")) form.image = formData.get("image") as File;

    const product = await update(slug, form);

    return Response.json(product);
  } catch (err) {
    return Response.json(JSON.stringify(err), {
      status: 422,
    });
  }
};

export const DELETE = async (
  _req: Request,
  { params: { slug } }: PathParams
) => {
  const product = await remove(slug);

  if (product === null) {
    return new Response(`Product not found`, {
      status: 404,
    });
  }

  return new Response(null, {
    status: 204,
  });
};
