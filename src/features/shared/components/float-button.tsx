"use client";

import { useRequests } from "@/features/requests/hooks/api";
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
  const { data: requests } = useRequests();

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

  const pendingItemCount =
    requests?.filter((r) => {
      const now = new Date();
      return r.status === "APPROVED" && now > new Date(r.returnDate);
    }).length || 0;

  const renderReturnButton = () => {
    console.log("pendingItemCount", pendingItemCount);
    if (pendingItemCount === 0) return <></>;

    return (
      <FloatButton
        tooltip="Pending items to return!"
        badge={{
          count: pendingItemCount,
          color: "yellow",
        }}
        href="/requests"
        icon={<IconShoppingBagCheck width={30} height={30} />}
      />
    );
  };

  const renderAuthButton = () => {
    if (status === "loading") return null;
    if (status === "unauthenticated") {
      return <FloatButton icon={<IconLogin />} href="/login" />;
    }
    return null;
  };

  const renderButtons = () => {
    switch (true) {
      case path === "/cart":
        return null;

      case path === "/dashboard/products":
        return (
          <>
            {renderReturnButton()}
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
          </>
        );

      case path.startsWith("/products"):
        return (
          <>
            {renderReturnButton()}
            <FloatButton
              {...buttonProps}
              tooltip="Checkout!"
              badge={{ count: cartAmount }}
              icon={<IconShoppingBagCheck width={30} height={30} />}
              onClick={() => router.push("/carts")}
            />
          </>
        );

      default:
        return (
          <>
            {renderReturnButton()}
            <FloatButton
              {...buttonProps}
              tooltip="Find more products to rent!"
              onClick={() => router.push("/products")}
            />
          </>
        );
    }
  };

  const buttonProps: FloatButtonProps = {
    type: "primary",
    shape: "circle",
    icon: <IconPlus width={30} height={30} />,
  };

  return (
    <>
      <FloatButton.Group shape="circle">
        {renderAuthButton()}
        {renderButtons()}
      </FloatButton.Group>
    </>
  );
};

export default ECTFloatButton;
