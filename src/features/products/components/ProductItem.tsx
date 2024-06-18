import { getImagePath } from "@/features/shared/helpers/upload";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import React from "react";
import { IProduct } from "../admin/type";
import Link from "next/link";

interface IProps {
  product: IProduct;
}
const ProductItem = ({ product }: IProps) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card
        className="product-item"
        hoverable
        cover={
          <Image
            alt="example"
            src={getImagePath(product.image) || "/assets/no-image.png"}
            width={200}
            height={200}
          />
        }
      >
        <Meta title={product.name} description={product.description} />
      </Card>
    </Link>
  );
};

export default ProductItem;
