"use client";
import EditItemForm from "@/features/products/admin/components/EditItemForm";
import { useFindProductBySlug } from "@/features/products/hooks/api";
import Loading from "@/features/shared/components/loading";
import NotFound from "@/features/shared/components/not-found";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const EditProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useFindProductBySlug(slug);

  if (isLoading) return <Loading />;

  if (!product) return <NotFound />;

  return <EditItemForm product={product} />;
};

export default EditProductPage;
