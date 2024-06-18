import React, { ReactNode, CSSProperties } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  type?: "primary" | "secondary" | "danger";
  htmlType?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

const ECTButton: React.FC<IProps> = ({
  children,
  className = "",
  type = "primary",
  htmlType = "button",
  fullWidth = true,
  onClick,
  style,
  disabled,
}) => {
  const buttonClass = `ect-button -${type} ${className}`.trim();

  const buttonStyle: CSSProperties = {
    width: fullWidth ? "100%" : undefined,
    ...style,
  };

  return (
    <button
      className={buttonClass}
      style={buttonStyle}
      type={htmlType}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ECTButton;
