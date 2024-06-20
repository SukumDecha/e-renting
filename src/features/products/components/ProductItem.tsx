import { getImagePath } from "@/features/shared/helpers/upload";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import React from "react";
import { IProduct } from "../admin/type";
import Link from "next/link";
import { renderTag } from "../helper";

interface IProps {
  product: IProduct;
}

const renderTitle = (product: IProduct) => {
  return (
    <div className="-title">
      <h2>{product.name}</h2>
      {renderTag(product.quantity)}
    </div>
  );
};
const ProductItem = ({ product }: IProps) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card
        className="product-item"
        hoverable
        cover={
          <Image
            alt="product-img"
            src={getImagePath(product.image) || "/assets/no-image.png"}
            width={300}
            height={300}
          />
        }
      >
        <Meta title={renderTitle(product)} description={product.description} />
      </Card>
    </Link>
  );
};

export default ProductItem;
