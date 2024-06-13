"use client";
import AuthForm from "@/features/auth/components/AuthForm";
import { SignIn } from "@/features/auth/types";
import { useUiStore } from "@/features/shared/stores/UiStore";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const setToast = useUiStore((state) => state.setToast);
  const router = useRouter();
  const onSubmit = async (credentials: SignIn) => {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.ok) {
      setToast({
        type: "Success",
        message: "Welcome back",
      });
      router.replace("/");
    }

    if (result?.error) {
      setToast({
        type: "Error",
        message: "Invalid Credentials",
      });
    }
  };
  return <AuthForm kind="login" onSubmit={onSubmit} />;
};

export default LoginPage;
