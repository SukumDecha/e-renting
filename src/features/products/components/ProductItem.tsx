import { IProduct } from "@/features/shared/types/IProduct";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import React from "react";

interface IProps {
  product: IProduct;
}
const ProductItem = ({ product }: IProps) => {
  return (
    <Card
      className="product-item"
      hoverable
      cover={
        <Image
          alt="example"
          src={product.image || "/assets/logo.jpeg"}
          width={200}
          height={200}
        />
      }
    >
      <Meta title={product.name} description={product.description} />
    </Card>
  );
};

export default ProductItem;
