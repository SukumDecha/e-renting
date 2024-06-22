import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
const ProductLayout = ({ children }: IProps) => {
  const layoutStyle = {
    padding: 8,
  };
  return <div style={layoutStyle}>{children}</div>;
};

export default ProductLayout;
