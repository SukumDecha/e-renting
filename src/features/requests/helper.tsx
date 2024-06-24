import { Tag } from "antd";
import { IRequest } from "./admin/type";

export const renderStatus = (status: IRequest["status"]) => {
  if (status === "APPROVED") {
    return <Tag color="lime">Approved</Tag>;
  }

  if (status === "RETURNED") {
    return <Tag color="green">Returned</Tag>;
  }

  if (status === "PENDING") {
    return <Tag color="orange">Pending</Tag>;
  }

  return <Tag color="red">Rejected</Tag>;
};
