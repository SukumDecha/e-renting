import db from "@/features/shared/db";
import z from "zod";
import { revalidatePath } from "next/cache";
import * as validators from "./validator";
import { saveFile } from "@/features/shared/helpers/file";

export const add = async (
  input: z.infer<typeof validators.addProductSchema>
) => {
  if (!input.image) {
    throw Error("No image uploaded");
  }

  const image = await saveFile(input.image);
  
  const product = await db.product.create({
    data: {
      ...input,
      image,
    },
  });

  revalidatePath("/products");
  return product;
};

export const update = async (
  id: number,
  input: z.infer<typeof validators.updateProductSchema>
) => {
  const article = db.product.update({
    where: {
      id,
    },
    data: {
      ...input,
      image: "",
    },
  });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);

  return article;
};

export const remove = async (id: number) => {
  const article = await db.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);

  return article;
};
