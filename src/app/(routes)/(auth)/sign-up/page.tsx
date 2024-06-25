"use client";

import AuthForm from "@/features/auth/components/auth-form";
import { useRegister } from "@/features/auth/hooks/api";
import { useUiStore } from "@/features/shared/stores/UiStore";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { mutateAsync } = useRegister();
  const router = useRouter();
  const openNotification = useUiStore((state) => state.openNotification);
  const onSubmit = async (credentials: any) => {
    await mutateAsync(credentials);

    openNotification({
      type: "success",
      message: "Register successfully",
      description: "Your account has been registered",
    });
    router.replace("/");
  };

  return <AuthForm kind="signup" onSubmit={onSubmit} />;
};

export default SignUpPage;
