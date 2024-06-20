"use client";

import { notification as antdNotification } from "antd";
import { useUiStore } from "../stores/UiStore";
import { useEffect } from "react";

const NotificationHandler = () => {
  const { notification: notify, clearNotification } = useUiStore();
  const [api, contextHolder] = antdNotification.useNotification();

  useEffect(() => {
    if (notify) {
      const { type, message, description } = notify;

      api[type]({ message, description, closable: true, duration: 3 });

      clearNotification();
    }
  }, [notify, api, clearNotification]);

  return <>{contextHolder}</>; // Ensure contextHolder is rendered
};

export default NotificationHandler;
