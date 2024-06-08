import { add, update } from "./api";

export type AddArticleInput = Parameters<typeof add>[0];

export type UpdateArticleInput = Parameters<typeof update>[0];
