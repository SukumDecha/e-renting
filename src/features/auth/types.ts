import * as validators from "./validators";
import * as z from "zod";

export type SignIn = z.infer<typeof validators.signIn>;

export type SignUp = z.infer<typeof validators.signUp>;

export type ProfileForm = z.infer<typeof validators.profile>;

export type Role = "MEMBER" | "ADMIN";

export interface Profile {
  id: string | number;
  email: string;
  image?: string;
  name: string;
  role: Role;
}
