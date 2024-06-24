import { slugify } from "@/features/shared/helpers/slugify";
import { IAddProduct, IProduct, IUpdateProduct } from "../admin/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateProduct = () => {
  return {
    mutateAsync: async (form: IAddProduct) => {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("slug", slugify(form.name));
      formData.append("quantity", form.quantity + "");

      if (form.image) formData.append("image", form.image.file.originFileObj);

      console.log(form.image.file.originFileObj);

      const res = await fetch(`/api/admin/product`, {
        method: "POST",
        body: formData,
      });

      const product = await (res.json() as Promise<IProduct>);
      return product;
    },
  };
};

export const useEditProduct = (slug: string) => {
  return useMutation({
    mutationFn: async (form: IUpdateProduct) => {
      const formData = new FormData();

      if (form.name) {
        formData.append("name", form.name);
      }
      if (form.description) formData.append("description", form.description);
      if (form.quantity) formData.append("quantity", form.quantity.toString());
      if (form.image) formData.append("image", form.image.file.originFileObj);

      const res = await fetch(`/api/admin/product/${slug}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Error while fetching: /api/admin/product/${slug}`);
      }

      const product = await (res.json() as Promise<IProduct>);
      return product;
    },
  });
};

export const useFindAllProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      const products = await (res.json() as Promise<IProduct>);

      return products;
    },
  });
};

export const useFindProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
};
