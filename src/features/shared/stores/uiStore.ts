import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";

export interface INotification {
  icon: IconType;
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
      openNotification({ icon, message, description }: INotification) {
        if (icon === "success") {
          notification.success({
            icon,
            message,
            description,
            closable: true,
            duration: 3,
          });
        } else if (icon === "error") {
          notification.error({
            icon,
            message,
            description,
            closable: true,
            duration: 3,
          });
        } else if (icon === "warning") {
          notification.warning({
            icon,
            message,
            description,
            closable: true,
            duration: 3,
          });
        } else {
          notification.info({
            icon,
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
