import { getServerAuthSession } from "@/features/auth/auth";
import { updateRequest } from "@/features/requests/admin/api";
import { IUpdateRequest } from "@/features/requests/admin/type";
import { updateRequestSchema } from "@/features/requests/admin/validator";

interface PathParams {
  params: {
    id: string;
  };
}

export const PATCH = async (req: Request, { params: { id } }: PathParams) => {
  const session = await getServerAuthSession();

  if (!session === null) {
    return new Response(JSON.stringify({ err: "Please Login" }), {
      status: 401,
    });
  }

  const { role } = session!.user;

  if (role !== "ADMIN") {
    return new Response(JSON.stringify({ err: "Unauthorized" }), {
      status: 401,
    });
  }

  const body = await (req.json() as Promise<IUpdateRequest>);
  try {
    const form = await updateRequestSchema.parseAsync(body);
    const request = await updateRequest(+id, form);
    return Response.json(request);
  } catch (error) {
    return new Response(JSON.stringify({ err: error }), {
      status: 422,
    });
  }
};
