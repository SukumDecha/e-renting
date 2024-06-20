import { findAll } from "@/features/products/api";
import { NextResponse } from "next/server";

export const GET = async (_req: Request) => {
  const products = await findAll();

  return NextResponse.json(products);
};
