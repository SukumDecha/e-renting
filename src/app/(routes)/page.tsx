import { IProduct } from "@/features/products/admin/type";
import { findAll } from "@/features/products/api";
import ProductList from "@/features/products/components/product-list";
import HeroBanner from "@/features/shared/components/home/hero-banner";
import React from "react";

const page = async () => {
  const products: IProduct[] = await findAll();

  return (
    <div className="flex flex-col gap-8 container mx-auto">
      <HeroBanner />
      <ProductList data={products} />
    </div>
  );
};

export default page;
