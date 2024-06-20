import { findAll } from "./../api";
import { addRequest, updateRequest } from "./api";

export type IRequest = Awaited<ReturnType<typeof findAll>>[0];
export type IAddRequest = Parameters<typeof addRequest>[0];
export type IUpdateProduct = Parameters<typeof updateRequest>[0];
