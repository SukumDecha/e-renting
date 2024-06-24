import CartCheckout from "@/features/cart/components/cart-check-out";
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
      <CartCheckout />
    </>
  );
};

export default CartPage;
