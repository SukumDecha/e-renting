import { findBySlug } from "@/features/products/api";
import ProductItemDetail from "@/features/products/components/ProductItemDetail";
import React from "react";

interface IProps {
  params: {
    slug: string;
  };
}
const ProductItemPage = async ({ params }: IProps) => {
  const product = await findBySlug(params.slug);

  if (!product) return null;

  return <ProductItemDetail product={product} />;
};

export default ProductItemPage;
