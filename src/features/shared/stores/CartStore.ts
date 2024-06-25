import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { ICart } from "@/features/cart/type";

export interface CartState {
  selectedCart: ICart[];
  setSelectedCart: (cart: ICart[]) => void;
  clearSelectedCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    immer((set) => ({
      selectedCart: [],
      setSelectedCart(cart) {
        set(
          (state) => {
            state.selectedCart = cart;
          },
          false,
          { type: "cart/setCart" }
        );
      },
      clearSelectedCart() {
        set(
          (state) => {
            state.selectedCart = [];
          },
          false,
          { type: "cart/clearCart" }
        );
      },
    }))
  )
);
