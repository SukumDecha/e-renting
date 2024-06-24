import { deleteRequest, updateRequest } from "@/features/requests/admin/api";
import { IUpdateRequest } from "@/features/requests/admin/type";
import { updateRequestSchema } from "@/features/requests/admin/validator";
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
  const body = await (req.json() as Promise<IUpdateRequest>);

  try {
    const form = await updateRequestSchema.parseAsync(body);
    const leave = await updateRequest(+id, form);
    return Response.json(leave);
  } catch (error) {
    return new Response(JSON.stringify(error), {
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
