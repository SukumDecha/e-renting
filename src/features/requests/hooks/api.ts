import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { IRequest } from "../admin/type";

interface IRequestData {
  cartId: number;
  productId: number;
  productQuantity: number;
  reason: string;
  requestDate: string;
  returnDate: string;
}
const fetchRequests = async () => {
  const res = await fetch("/api/request");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json() as Promise<IRequest[]>;
};

const borrowItem = async ({
  cartId,
  productId,
  productQuantity,
  reason,
  requestDate,
  returnDate,
}: IRequestData) => {
  const response = await fetch("/api/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId,
      productId,
      productQuantity,
      reason,
      requestDate,
      returnDate,
    }),
  });

  if (!response.ok) {
    const reqBody = await response.json();

    throw new Error(reqBody.err || "Failed to borrow item");
  }
};

const deleteRequest = async (id: number) => {
  const res = await fetch(`/api/request/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete request");
};

const updateRequestStatus = async ({
  id,
  status,
}: {
  id: number;
  status: string;
}) => {
  const res = await fetch(`/api/request/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update request status");
};

export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBorrowItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: borrowItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["requests"] });
      message.success("Deleted request successfully");
    },
    onError: () => {
      message.error("Error while deleting request");
    },
  });
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRequestStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["requests"] });
      message.success("Updated request status successfully");
    },
  });
};
