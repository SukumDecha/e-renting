import { getServerAuthSession } from "@/features/auth/auth";
import { findAll } from "@/features/requests/api";

export const GET = async () => {
  const session = await getServerAuthSession();
  if (!session) return Response.json({ err: "Please Login" }, { status: 401 });

  const { role } = session.user;
  if (role !== "ADMIN")
    return Response.json({ err: "Unauthorized" }, { status: 401 });

  const requests = await findAll({ userId: +session.user.id, isAdmin: true });

  return Response.json(requests);
};
