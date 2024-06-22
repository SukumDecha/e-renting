import db from "@/features/shared/db";
import z from "zod";
import { revalidatePath } from "next/cache";
import * as validators from "./validator";
import { removeDirFromFile, saveFile } from "@/features/shared/helpers/file";
import { findBySlug } from "../api";
import { slugify } from "@/features/shared/helpers/slugify";

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
  slug: string,
  input: z.infer<typeof validators.updateProductSchema>
) => {
  let product: any = await findBySlug(slug);

  if (product === null) {
    throw new Error(`Product with slug ${slug} not found`);
  }

  let { image } = product;

  if (input.image) {
    const currentImage = image;
    image = await saveFile(input.image);
    if (currentImage) removeDirFromFile(currentImage);
  }

  product = db.product.update({
    where: {
      slug,
    },
    data: {
      ...input,
      image,
      slug: input.name ? slugify(input.name) : undefined,
    },
  });

  revalidatePath(`/`);
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);

  return product;
};

export const remove = async (slug: string) => {
  const product = await db.product.delete({
    where: {
      slug,
    },
  });

  revalidatePath(`/`);
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);

  return product;
};
