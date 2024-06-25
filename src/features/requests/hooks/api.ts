import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { IRequest } from "../admin/type";

const fetchRequests = async () => {
  const res = await fetch("/api/request");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json() as Promise<IRequest[]>;
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
  });
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      message.success("Updated request status successfully");
    },
  });
};
