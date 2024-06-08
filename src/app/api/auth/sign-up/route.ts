import { SignUp } from "@/features/auth/types";
import { signUp } from "@/features/auth/validators";
import * as api from "@/features/users/api";

export const POST = async (req: Request) => {
  const body = await (req.json() as Promise<SignUp>);

  try {
    const credentials = await signUp.parseAsync(body);

    const profile = await api.createUser(credentials);

    return new Response(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 422 });
  }
};
