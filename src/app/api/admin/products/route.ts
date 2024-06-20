import { getServerAuthSession } from "@/features/auth/auth";
import { revalidatePath } from "next/cache";
import * as api from "@/features/products/admin/api";

export const POST = async (req: Request) => {
  try {
    // Check authentication
    const session = await getServerAuthSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Please Login" }), {
        status: 401,
      });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const slug = formData.get("slug") as string;
    const quantity = formData.get("quantity");
    const image = formData.get("image") as File | null;

    if (!name || !description || !slug || quantity === null) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const parsedQuantity = Number(quantity) || 0;

    const product = await api.add({
      name,
      slug,
      description,
      quantity: parsedQuantity,
      image,
    });

    revalidatePath("/");
    revalidatePath("/products");

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error("Error processing product addition:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
