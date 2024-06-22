import { IProduct } from "@/features/products/admin/type";
import { findAll } from "@/features/products/api";
import ProductList from "@/features/products/components/ProductList";
import NotFound from "@/features/shared/components/not-found";
import React from "react";

const ProductPage = async () => {
  const products: IProduct[] = await findAll();

  if (products.length === 0) {
    return <NotFound reason="ไม่มีอุปกรณ์ที่สามารถยืมได้ในขณะนี้" />;
  }

  return <ProductList data={products} />;
};

export default ProductPage;
