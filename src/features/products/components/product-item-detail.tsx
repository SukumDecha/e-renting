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
import { useUiStore } from "@/features/shared/stores/UiStore";
import { useAddCart } from "@/features/cart/hooks/api";

interface IProps {
  product: IProduct;
}

const ProductItemDetail = ({ product }: IProps) => {
  const router = useRouter();
  const openNotification = useUiStore((state) => state.openNotification);
  const { mutateAsync: addToCart, error } = useAddCart();

  const handleAddToCart = async () => {
    const data = {
      productId: product.id,
      amount: 1,
    };

    await addToCart(data);

    if (error) {
      openNotification({
        type: "error",
        message: "Something went wrong",
        description: error.message,
      });
      return;
    }

    openNotification({
      type: "success",
      message: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });

    router.push("/products");
  };

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
          <h4 className="-title">
            {product.name}
            <Tooltip
              className="tag"
              color="grey"
              title={`${product.quantity} items left`}
            >
              {renderTag(product.quantity)}
            </Tooltip>
          </h4>

          <p className="-details">{product.description}</p>

          <p className="-quantity">Currently {product.quantity} items left.</p>
          <ECTButton
            color="secondary"
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
          >
            Add to cart
          </ECTButton>
        </div>
      </Card>
    </div>
  );
};

export default ProductItemDetail;
