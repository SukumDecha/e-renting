"use client";
import AuthForm from "@/features/auth/components/AuthForm";
import { useRegister } from "@/features/auth/hooks/api";
import { useUiStore } from "@/features/shared/stores/UiStore";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const { mutateAsync } = useRegister();
  const router = useRouter();
  const setToast = useUiStore((state) => state.setToast);
  const onSubmit = async (credentials: any) => {
    console.log(credentials);
    await mutateAsync(credentials);

    setToast({
      type: "Success",
      message: "Your account has been registered.",
    });
    router.replace("/");
  };

  return <AuthForm kind="signup" onSubmit={onSubmit} />;
};

export default SignUpPage;
