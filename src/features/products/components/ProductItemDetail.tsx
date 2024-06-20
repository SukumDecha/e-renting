"use client";

import React from "react";
import { IProduct } from "../admin/type";
import { Card, Tooltip } from "antd";
import { getImagePath } from "@/features/shared/helpers/upload";
import Image from "next/image";
import ECTButton from "@/features/shared/components/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { renderTag } from "../helper";

interface IProps {
  product: IProduct;
}

const renderTitle = () => {
  return (
    <Link href="/" className="-card-title">
      <IconArrowLeft />
      Go back
    </Link>
  );
};

const ProductItemDetail = ({ product }: IProps) => {
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
          <ECTButton type="primary">Click to Borrow</ECTButton>
        </div>
      </Card>
    </div>
  );
};

export default ProductItemDetail;
