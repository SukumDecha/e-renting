import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { Role } from "../types";
import { useUiStore } from "@/features/shared/stores/UiStore";
import Loading from "@/features/shared/components/loading";

interface ProtectedRouteProps {
  roles?: Role[];
  children: ReactNode;
}

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const openNotification = useUiStore((state) => state.openNotification);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAllowed, setAllowed] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      openNotification({
        type: "error",
        message: "Unauthenticated",
        description: "Please login before access this page",
      });
      router.replace("/auth/login");
      return;
    }
    if (!roles) return setAllowed(true);
    if (status === "authenticated" && roles.includes(session?.user.role))
      return setAllowed(true);

    openNotification({
      type: "error",
      message: "No permission",
      description: "You're not allowed to access this page",
    });

    router.replace("/forbidden");
  }, [roles, router, session?.user.role, status]);

  if (status === "loading") return <Loading />;
  if (isAllowed) return <>{children}</>;

  return null;
};

export default ProtectedRoute;
