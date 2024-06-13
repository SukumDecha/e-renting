import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  type?: "primary" | "secondary" | "danger";
  htmlType?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: () => void;
  style?: any;
}

const ECTButton = ({
  children,
  className,
  type = "primary",
  htmlType = "button",
  fullWidth = true,
  onClick,
  style,
}: IProps) => {
  return (
    <button
      className={`ect-button ${
        type === "primary"
          ? "-primary"
          : type === "secondary"
          ? "-secondary"
          : "-danger"
      } ${className}`}
      style={{
        width: fullWidth ? "100%" : "",
        ...style,
      }}
      type={htmlType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ECTButton;
