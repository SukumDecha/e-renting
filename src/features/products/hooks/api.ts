import { image } from "@/features/shared/validators/image";
import { slugify } from "@/features/shared/helpers/slugify";
import { IAddProduct, IProduct } from "../admin/type";

export const useCreateProduct = () => {
  return {
    mutateAsync: async (form: IAddProduct) => {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("slug", slugify(form.name));
      formData.append("quantity", form.quantity + "");

      if (form.image) formData.append("image", form.image[0].originFileObj);

      const res = await fetch(`/api/product/admin`, {
        method: "POST",
        body: formData,
      });

      const product = await (res.json() as Promise<IProduct>);
      return product;
    },
  };
};
