import { Tag } from "antd";
import { IRequest } from "./admin/type";

export const renderStatus = (
  status: IRequest["status"],
  rejectionSeason?: string
) => {
  if (status === "APPROVED") {
    return <Tag color="lime">Approved</Tag>;
  }

  if (status === "RETURNED") {
    return <Tag color="green">Returned</Tag>;
  }

  if (status === "PENDING") {
    return <Tag color="orange">Pending</Tag>;
  }

  return (
    <>
      <Tag color="red">Rejected</Tag>
      <p>{rejectionSeason}</p>
    </>
  );
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};

export const getDuration = (requestDate: Date, returnDate: Date) => {
  const duration = Math.floor(
    (new Date(returnDate).getTime() - new Date(requestDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return duration;
};
