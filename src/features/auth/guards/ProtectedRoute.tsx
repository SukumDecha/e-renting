import { useUiStore } from "@/features/shared/stores/uiStore";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  roles?: Role[];
  children: ReactNode;
}

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const setToast = useUiStore((state) => state.setToast);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAllowed, setAllowed] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setToast({ type: "Error", message: "Please login." });
      router.replace("/auth/sign-in");
      return;
    }
    if (!roles) return setAllowed(true);
    if (status === "authenticated" && roles.includes(session?.user.role))
      return setAllowed(true);

    setToast({
      type: "Error",
      message: "You are not allowed to access this page",
    });
    router.replace("/forbidden");
  }, [roles, router, session?.user.role, setToast, status]);

  if (status === "loading") return <div>Loading....</div>;
  if (isAllowed) return <>{children}</>;

  return null;
};

export default ProtectedRoute;
