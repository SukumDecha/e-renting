import { slugify } from "@/features/shared/helpers/slugify";
import { IAddProduct, IProduct, IUpdateProduct } from "../admin/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: IAddProduct) => {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("slug", slugify(form.name));
      formData.append("quantity", form.quantity + "");

      if (form.image) formData.append("image", form.image.file.originFileObj);

      const res = await fetch(`/api/admin/product`, {
        method: "POST",
        body: formData,
      });

      const product = await (res.json() as Promise<IProduct>);
      return product;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useEditProduct = (slug: string) => {
  const queryClient = useQueryClient();

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

// Unused
// export const useFindAllProduct = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await fetch("/api/product");
//       const products = await (res.json() as Promise<IProduct>);

//       return products;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };

export const useFindProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      const res = await fetch(`/api/product/${slug}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};
