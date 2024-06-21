"use client";

import React from "react";
import { IProduct } from "../admin/type";
import { Card, Tooltip } from "antd";
import { getImagePath } from "@/features/shared/helpers/upload";
import Image from "next/image";
import ECTButton from "@/features/shared/components/button";
import { renderTag } from "../helper";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

interface IProps {
  product: IProduct;
}

const ProductItemDetail = ({ product }: IProps) => {
  const router = useRouter();

  const renderTitle = () => {
    return (
      <div className="-card-title" onClick={() => router.back()}>
        <IconArrowLeft />
        Go back
      </div>
    );
  };

  return (
    <div className="product-item-detail">
      <Card
        hoverable
        title={renderTitle()}
        cover={
          <Image
            alt="product-img"
            className="-image"
            src={getImagePath(product.image)}
            width={300}
            height={300}
          />
        }
        className="-card"
      >
        <div className="-card-details">
          <h4 className="title">
            {product.name}
            <Tooltip
              className="tag"
              color="grey"
              title={`${product.quantity} items left`}
            >
              {renderTag(product.quantity)}
            </Tooltip>
          </h4>

          <p className="details">{product.description}</p>

          <p>Currently {product.quantity} items left.</p>
          <ECTButton color="secondary">Click to Borrow</ECTButton>
        </div>
      </Card>
    </div>
  );
};

export default ProductItemDetail;
