import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { notification } from "antd";

export interface INotification {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description: string;
}

export interface UiState {
  notification: INotification | null;
  openNotification: (data: INotification) => void;
}

export const useUiStore = create<UiState>()(
  immer(
    devtools((set) => ({
      notification: null,
      openNotification({ type, message, description }: INotification) {
        switch (type) {
          case "success":
            notification.success({
              message,
              description,
              closable: true,
              duration: 3,
            });
            break;
          case "info":
            notification.info({
              message,
              description,
              closable: true,
              duration: 3,
            });
            break;
          case "warning":
            notification.warning({
              message,
              description,
              closable: true,
              duration: 3,
            });
            break;
          case "error":
            notification.error({
              message,
              description,
              closable: true,
              duration: 3,
            });
            break;
          default:
            notification.open({
              message,
              description,
              closable: true,
              duration: 3,
            });
        }
      },
    }))
  )
);
