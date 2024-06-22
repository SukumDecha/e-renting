import { addCart, findAll, updateCart } from "./api";

export type ICart = Awaited<ReturnType<typeof findAll>>[0];
export type IAddCart = Parameters<typeof addCart>[1];
export type IUpdateCart = Parameters<typeof updateCart>[1];
