import { IconTrashFilled } from "@tabler/icons-react";
import { Button, Popconfirm } from "antd";
import React, { useState } from "react";

interface IProps {
  onDelete: (data: any) => void;
}
const DeleteButton = ({ onDelete }: IProps) => {
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
      description="Would you like to delete this"
      okText="Confirm"
      okType="default"
      cancelButtonProps={{
        danger: true,
        ghost: true,
      }}
      open={open}
      onConfirm={onDelete}
      onCancel={handleCancel}
    >
      <Button
        color="primary"
        shape="circle"
        onClick={showPopconfirm}
        danger
        icon={<IconTrashFilled />}
      />
    </Popconfirm>
  );
};

export default DeleteButton;
