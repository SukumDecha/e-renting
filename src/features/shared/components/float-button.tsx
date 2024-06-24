"use client";

import { IconLogin, IconPlus, IconShoppingBagCheck } from "@tabler/icons-react";
import { FloatButton, FloatButtonProps } from "antd";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ECTFloatButton = () => {
  const path = usePathname();
  const router = useRouter();
  const { status } = useSession();
  const [cartAmount, setCartAmount] = useState(0);

  const fetchCart = useCallback(async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCartAmount(data.length);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCart();
    }
  }, [status, fetchCart]);

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    return <FloatButton icon={<IconLogin />} href="/login" />;
  }

  const buttonProps: FloatButtonProps = {
    type: "primary",
    shape: "circle",
    icon: <IconPlus width={30} height={30} />,
  };

  if (path === "/cart") return null;

  if (path === "/dashboard/products") {
    return (
      <FloatButton
        {...buttonProps}
        tooltip="Add new product"
        icon={
          <div className="flex justify-center items-center">
            <IconPlus width={30} height={30} />
          </div>
        }
        onClick={() => router.push("/dashboard/products/create")}
      />
    );
  }

  if (path.startsWith("/products")) {
    return (
      <FloatButton
        {...buttonProps}
        tooltip="Checkout!"
        badge={{
          count: cartAmount,
        }}
        icon={<IconShoppingBagCheck width={30} height={30} />}
        onClick={() => router.push("/carts")}
      />
    );
  }

  return (
    <FloatButton
      {...buttonProps}
      tooltip="Find more products to rent!"
      onClick={() => router.push("/products")}
    />
  );
};

export default ECTFloatButton;
