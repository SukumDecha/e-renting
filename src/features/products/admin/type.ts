import { findAll } from "../api";
import { add, update } from "./api";

export type IProduct = Awaited<ReturnType<typeof findAll>>[0];

export type IAddProduct = Parameters<typeof add>[0];

export type IUpdateProduct = Parameters<typeof update>[0];
