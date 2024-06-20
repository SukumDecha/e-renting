import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

export interface INotification {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description: string;
}

export interface UiState {
  notification: INotification | null;
  openNotification: (data: INotification) => void;
  clearNotification: () => void;
}

export const useUiStore = create<UiState>()(
  immer(
    devtools((set) => ({
      notification: null,
      openNotification(data: INotification) {
        set({ notification: data });
      },
      clearNotification() {
        set({ notification: null });
      },
    }))
  )
);
