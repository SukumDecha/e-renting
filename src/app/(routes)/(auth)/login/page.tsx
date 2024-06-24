"use client";
import AuthForm from "@/features/auth/components/auth-form";
import { SignIn } from "@/features/auth/types";
import { useUiStore } from "@/features/shared/stores/UiStore";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const openNotification = useUiStore((state) => state.openNotification);
  const router = useRouter();
  const onSubmit = async (credentials: SignIn) => {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.ok) {
      openNotification({
        type: "success",
        message: "Login Successfully",
        description: "Welcome back",
      });
      router.replace("/");
    }

    if (result?.error) {
      openNotification({
        type: "error",
        message: "Login Failed",
        description: "Invalid credentials",
      });
    }
  };
  return <AuthForm kind="login" onSubmit={onSubmit} />;
};

export default LoginPage;
