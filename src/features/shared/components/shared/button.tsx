import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  type?: "primary" | "secondary" | "danger";
  buttonType?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: () => void;
  style?: any;
}

const ECTButton = ({
  children,
  className,
  type = "primary",
  buttonType = "button",
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
      type={buttonType}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ECTButton;
