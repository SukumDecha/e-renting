import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { ICart } from "../types/ICart";

export interface CartState {
  cart: ICart[];
  addCart: (cart: ICart) => void;
  removeCart: (cart: ICart) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    immer((set) => ({
      cart: [],
      addCart(cart) {
        set(
          (state) => {
            state.cart.push(cart);
          },
          false,
          { type: "cart/addCart" }
        );
      },
      removeCart(cart) {
        set(
          (state) => {
            state.cart = state.cart.filter(
              (item: ICart) => item.id !== cart.id
            );
          },
          false,
          { type: "cart/removeCart" }
        );
      },
      clearCart() {
        set(
          (state) => {
            state.cart = [];
          },
          false,
          { type: "cart/clearCart" }
        );
      },
    }))
  )
);
