import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/features/shared/db";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { Role } from "./types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    sub: string;
  }
}
function isUpdateSession(
  session: unknown
): session is Record<"name" | "email" | "image", string | undefined> {
  if (!session) return false;
  if (session !== "object") return false;

  return true;
}

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user, session, trigger }) {
      if (trigger === "update" && isUpdateSession(session)) {
        if (session.name) token.name = session.name;
        if (session.email) token.email = session.email;
        if (session.image) token.picture = session.image;
      }
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          name: token.name,
          email: token.email,
          image: token.picture,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) return null;
        if (!credentials?.password) return null;
        if (!(await bcrypt.compare(credentials?.password, user.password))) {
          return null;
        }

        return { ...user, id: user.id.toString() };
      },
    }),
  ],
} satisfies NextAuthOptions;

export const getServerAuthSession = () => getServerSession(authOptions);
