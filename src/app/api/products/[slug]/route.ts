import { findBySlug } from "@/features/products/api";

interface PathParams {
  params: {
    slug: string;
  };
}

export const GET = async (_req: Request, { params: { slug } }: PathParams) => {
  const product = await findBySlug(slug);

  return Response.json(product);
};
