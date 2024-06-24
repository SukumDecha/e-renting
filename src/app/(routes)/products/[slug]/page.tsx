import { findBySlug } from "@/features/products/api";
import ProductItemDetail from "@/features/products/components/product-item-detail";
import { Flex } from "antd";
import React from "react";

interface IProps {
  params: {
    slug: string;
  };
}
const ProductItemPage = async ({ params }: IProps) => {
  const product = await findBySlug(params.slug);

  if (!product) return null;

  return (
    <Flex justify="center" align="center">
      <ProductItemDetail product={product} />
    </Flex>
  );
};

export default ProductItemPage;
