"use client";

import { IconPlus } from "@tabler/icons-react";
import CartSummary from "./cart-summary";
import CartTable from "./cart-table";
import { useCartStore } from "@/features/shared/stores/CartStore";

const CartCheckout = () => {
  const selectedCart = useCartStore((state) => state.selectedCart);

  return (
    <div className="cart-checkout">
      <CartTable />
      <CartSummary carts={selectedCart} />
    </div>
  );
};

export default CartCheckout;
