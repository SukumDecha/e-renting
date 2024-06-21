import Link from "next/link";
import React, { ReactNode, CSSProperties } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "danger";
  htmlType?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
  href?: string;
}

const ECTButton: React.FC<IProps> = ({
  children,
  className = "",
  color = "primary",
  htmlType = "button",
  fullWidth = true,
  onClick,
  style,
  disabled,
  href,
}) => {
  const buttonClass = `ect-button -${color} ${className}`.trim();

  const buttonStyle: CSSProperties = {
    width: fullWidth ? "100%" : undefined,
    ...style,
  };

  if (href) {
    return (
      <Link href={href}>
        <button
          className={buttonClass}
          style={buttonStyle}
          type={htmlType}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      </Link>
    );
  }
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
