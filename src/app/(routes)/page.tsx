import ProductList from "@/features/products/components/ProductList";
import HeroBanner from "@/features/shared/components/home/hero-banner";
import { IProduct } from "@/features/shared/types/IProduct";
import React from "react";

const page = async () => {
  // const products = await findAll({ limit: 5 });
  const updatedAt = new Date();
  const products: IProduct[] = [
    {
      id: 1,
      name: "Project A",
      slug: "project-a",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project A.",
      totalAmount: 10000,
      currentAmount: 5000,
      updatedAt,
    },
    {
      id: 2,
      name: "Project B",
      slug: "project-b",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project B.",
      totalAmount: 15000,
      currentAmount: 7000,
      updatedAt,
    },
    {
      id: 3,
      name: "Project C",
      slug: "project-c",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project C.",
      totalAmount: 20000,
      currentAmount: 12000,
      updatedAt,
    },
    {
      id: 4,
      name: "Project D",
      slug: "project-d",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project D.",
      totalAmount: 8000,
      currentAmount: 8000,
      updatedAt,
    },
    {
      id: 5,
      name: "Project E",
      slug: "project-e",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project E.",
      totalAmount: 5000,
      currentAmount: 2000,
      updatedAt,
    },
    {
      id: 6,
      name: "Project F",
      slug: "project-f",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project F.",
      totalAmount: 25000,
      currentAmount: 18000,
      updatedAt,
    },
    {
      id: 7,
      name: "Project G",
      slug: "project-g",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project G.",
      totalAmount: 12000,
      currentAmount: 3000,
      updatedAt,
    },
    {
      id: 8,
      name: "Project H",
      slug: "project-h",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project H.",
      totalAmount: 6000,
      currentAmount: 4000,
      updatedAt,
    },
    {
      id: 9,
      name: "Project I",
      slug: "project-i",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project I.",
      totalAmount: 30000,
      currentAmount: 25000,
      updatedAt,
    },
    {
      id: 10,
      name: "Project J",
      slug: "project-j",
      image: "/assets/logo.jpeg",
      description: "A brief description of Project J.",
      totalAmount: 4000,
      currentAmount: 1500,
      updatedAt,
    },
  ];

  return (
    <div className="flex flex-col gap-8 container mx-auto border-4 border-red-500">
      <HeroBanner />
      <ProductList products={products} />
    </div>
  );
};

export default page;
