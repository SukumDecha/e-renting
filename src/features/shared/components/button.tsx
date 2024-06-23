import { Spin } from "antd";
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
  loading?: boolean;
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
  loading,
}) => {
  const buttonClass = `ect-button -${color} ${className}`.trim();

  const buttonStyle: CSSProperties = {
    width: fullWidth ? "100%" : undefined,
    ...style,
  };

  const spinStyle: CSSProperties = {
    marginLeft: 16,
  };

  const renderSpin = loading && <Spin style={spinStyle} />;

  const buttonProps = {
    className: buttonClass,
    style: buttonStyle,
    type: htmlType,
    onClick,
    disabled,
  };

  if (href) {
    return (
      <Link href={href}>
        <button {...buttonProps}>
          {renderSpin}
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button {...buttonProps}>
      {renderSpin}
      {children}
    </button>
  );
};

export default ECTButton;
