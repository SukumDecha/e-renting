"use client";

import { FloatButton } from "antd";
import { IconPlus } from "@tabler/icons-react";
import CartSummary from "./CartSummary";
import CartTable from "./CartTable";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/shared/stores/CartStore";

const CartCheckout = () => {
  const router = useRouter();
  const selectedCart = useCartStore((state) => state.selectedCart);

  return (
    <div className="cart-checkout">
      <CartTable />
      <CartSummary carts={selectedCart} />
      <FloatButton
        tooltip="Checkout"
        type="primary"
        shape="circle"
        icon={<IconPlus width={30} height={30} />}
        onClick={() => router.push("/products")}
      />
    </div>
  );
};

export default CartCheckout;
