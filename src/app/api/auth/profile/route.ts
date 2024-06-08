import { getServerAuthSession } from "@/features/auth/auth";
import { ProfileForm } from "@/features/auth/types";
import { updateUser } from "@/features/users/api";

export const PATCH = async (request: Request) => {
  const session = await getServerAuthSession();
  if (!session) {
    return Response.json({ err: "Please Login" }, { status: 401 });
  }

  const formData = await request.formData();
  const form = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    image: formData.get("image"),
  } as ProfileForm;

  const profile = await updateUser(+session.user.id, form);
  return Response.json(profile);
};
