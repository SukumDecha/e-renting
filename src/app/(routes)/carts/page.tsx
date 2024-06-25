import CartSummary from "@/features/cart/components/cart-summary";
import CartTable from "@/features/cart/components/cart-table";
import React, { CSSProperties } from "react";

const CartPage = () => {
  const titleStyle: CSSProperties = {
    textAlign: "center",
    fontSize: "2rem",
  };

  return (
    <>
      <h1 style={titleStyle}>ตะกร้าของคุณ</h1>
      <br />
      <div className="cart-checkout">
        <CartTable />
        <CartSummary />
      </div>
    </>
  );
};

export default CartPage;
