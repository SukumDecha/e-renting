import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { ICart } from "../type";

const fetchCarts = async () => {
  const res = await fetch("/api/cart");
  if (!res.ok) throw new Error("Failed to fetch carts");
  return res.json() as Promise<ICart[]>;
};

const addCart = async (data: { productId: number; amount: number }) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const reqBody = await res.json();
    throw new Error(reqBody.err || "Failed to add product to cart");
  }
};

const deleteCart = async (id: number) => {
  const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete cart #" + id);
};

const updateCart = async ({
  id,
  quantity,
  productId,
}: {
  id: number;
  quantity: number;
  productId: number;
}) => {
  const res = await fetch(`/api/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quantity,
      productId,
    }),
  });
  if (!res.ok) throw new Error("Failed to update request status");
};

export const useCarts = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: fetchCarts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      message.error("Error while adding product to cart");
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      message.error("Error while deleting cart");
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
};
