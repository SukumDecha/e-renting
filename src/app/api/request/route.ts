import { getServerAuthSession } from "@/features/auth/auth";
import { addRequest } from "@/features/requests/admin/api";
import { IAddRequest } from "@/features/requests/admin/type";
import { addRequestSchema } from "@/features/requests/admin/validator";
import { findAll } from "@/features/requests/api";

export const GET = async () => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: "Please Login" }, { status: 401 });

  const requests = await findAll({ userId: +session.user.id });

  return Response.json(requests);
};

export const POST = async (req: Request) => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: "Please Login" }, { status: 401 });

  const body = await (req.json() as Promise<IAddRequest>);

  try {
    const form = await addRequestSchema.parseAsync(body);
    const request = await addRequest(+session.user.id, form);
    return new Response(JSON.stringify(request), {
      status: 201,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ err: error.message }), {
      status: 422,
    });
  }
};
