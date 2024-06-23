import { getServerAuthSession } from "@/features/auth/auth";
import { IconLogin, IconShoppingCart } from "@tabler/icons-react";
import { FloatButton } from "antd";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ProductLayout = async ({ children }: IProps) => {
  const session = await getServerAuthSession();

  const renderFloatButton = () => {
    if (!session) {
      return <FloatButton icon={<IconLogin />} href="/login" />;
    }

    return <FloatButton icon={<IconShoppingCart />}  href="/carts" />;
  };
  const layoutStyle = {
    padding: 8,
  };

  return (
    <div style={layoutStyle}>
      {children}
      {renderFloatButton()}
    </div>
  );
};

export default ProductLayout;
