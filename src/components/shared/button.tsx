import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  primary?: boolean;
}
const ECTButton = ({ children, primary = true }: IProps) => {
  return (
    <div className={`ect-button ${primary ? "-primary" : "-secondary"}`}>
      {children}
    </div>
  );
};

export default ECTButton;
