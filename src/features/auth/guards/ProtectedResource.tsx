import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import { Role } from "../types";
import Loading from "@/features/shared/components/loading";

interface ProtectedResourceProps {
  roles?: Role[];
  children: ReactNode;
}

const ProtectedResource = ({ children, roles }: ProtectedResourceProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return null;
  if (
    status === "authenticated" &&
    roles &&
    !roles.includes(session.user.role)
  ) {
    return null;
  }
  
  return <div>{children}</div>;
};

export default ProtectedResource;
