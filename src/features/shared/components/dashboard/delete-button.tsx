import { IconTrashFilled } from "@tabler/icons-react";
import { Button, Popconfirm } from "antd";
import React, { ReactNode, useState } from "react";

interface IProps {
  handleDelete: (data: any) => void;
}
const DeleteButton = ({ handleDelete }: IProps) => {
  const [open, setOpen] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Are you sure?"
      description="Would you like to delete this product"
      okText="Confirm"
      okType="default"
      cancelButtonProps={{
        danger: true,
        ghost: true,
      }}
      open={open}
      onConfirm={handleDelete}
      onCancel={handleCancel}
    >
      <Button
        type="primary"
        shape="circle"
        onClick={showPopconfirm}
        danger
        icon={<IconTrashFilled />}
      />
    </Popconfirm>
  );
};

export default DeleteButton;
