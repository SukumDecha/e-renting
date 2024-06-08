import { findAll } from "@/features/products/api";

export type IProduct = Awaited<ReturnType<typeof findAll>>[number];
