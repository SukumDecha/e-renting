import { Tag } from "antd";

export const renderTag = (quantity: number) => {
  if (quantity > 5) {
    return <Tag color="green">Available</Tag>;
  }

  if (quantity <= 5) {
    return <Tag color="orange">Running out</Tag>;
  }

  return <Tag color="red">Out of stock</Tag>;
};
