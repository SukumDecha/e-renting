import { getServerAuthSession } from "@/features/auth/auth";
import { deleteRequest, updateRequest } from "@/features/requests/admin/api";
import { IUpdateRequest } from "@/features/requests/admin/type";
import { updateRequestStatusSchema } from "@/features/requests/admin/validator";
import { findById } from "@/features/requests/api";

interface PathParams {
  params: {
    id: string;
  };
}

export const GET = async (_req: Request, { params: { id } }: PathParams) => {
  const request = await findById(+id);

  return Response.json(request);
};

export const PATCH = async (req: Request, { params: { id } }: PathParams) => {
  const session = await getServerAuthSession();

  if (!session === null) {
    return new Response(JSON.stringify({ err: "Please Login" }), {
      status: 401,
    });
  }

  const body = await (req.json() as Promise<IUpdateRequest>);
  try {
    const form = await updateRequestStatusSchema.parseAsync(body);
    const request = await updateRequest(+id, form);
    return Response.json(request);
  } catch (error) {
    return new Response(JSON.stringify({ err: error }), {
      status: 422,
    });
  }
};

export const DELETE = async (_req: Request, { params: { id } }: PathParams) => {
  const cart = await deleteRequest(+id);

  if (cart === null) {
    return new Response(`Cart not found`, {
      status: 404,
    });
  }

  return new Response(null, {
    status: 204,
  });
};
