"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  message,
  Space,
  Table,
  Form,
  InputNumber,
  Button,
  Divider,
} from "antd";

import Image from "next/image";
import { getImagePath } from "@/features/shared/helpers/upload";
import DeleteButton from "@/features/shared/components/dashboard/delete-button";
import EditButton from "@/features/shared/components/dashboard/edit-button";
import { ColumnType } from "antd/es/table";
import { useCartStore } from "@/features/shared/stores/CartStore";
import { ICart } from "../type";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useCarts, useDeleteCart, useUpdateCart } from "../hooks/api";

const CartTable = () => {
  const { data: carts } = useCarts();
  const { mutateAsync: onDelete } = useDeleteCart();
  const { mutateAsync: onUpdate } = useUpdateCart();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedCart, setSelectedCart, clearSelectedCart] = useCartStore(
    (state) => [
      state.selectedCart,
      state.setSelectedCart,
      state.clearSelectedCart,
    ]
  );

  const [form] = Form.useForm();

  const handleEdit = useCallback(
    (record: Partial<ICart> & { id: React.Key }) => {
      form.setFieldsValue({ quantity: record.amount });
      setEditingKey(record.id);
    },
    [form]
  );

  const handleCancel = useCallback(() => setEditingKey(null), []);

  const handleSave = useCallback(
    async (key: React.Key, productId: number) => {
      try {
        const { quantity } = await form.validateFields();
        const updatedQuantity = parseInt(quantity, 10);

        if (!carts) {
          message.error("Error while updating cart");
          return;
        }

        await onUpdate({
          id: key as number,
          quantity: updatedQuantity,
          productId,
        });

        const updatedCarts = carts.map((cart) =>
          cart.id === key ? { ...cart, amount: updatedQuantity } : cart
        );
        setSelectedCart(updatedCarts);
        setEditingKey(null);

        message.success(`Updated cart #${key} successfully`);
      } catch {
        message.error(`Error while updating cart #${key}`);
      }
    },
    [form, carts, setSelectedCart, onUpdate]
  );

  const handleClearCart = useCallback(async () => {
    selectedCart.forEach(async (c) => await onDelete(c.id));

    clearSelectedCart();
    setSelectedRowKeys([]);
  }, [onDelete, clearSelectedCart, selectedCart]);

  const isEditing = (record: ICart) => record.id === editingKey;

  type EditableColumnType = ColumnType<ICart> & {
    editable?: boolean;
  };

  const columns: EditableColumnType[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => <a>{record.product.name}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="quantity"
            style={{ margin: 0 }}
            rules={[
              { required: true, message: "Please input quantity!" },
              {
                type: "number",
                min: 1,
                message: "Quantity must be at least 1",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        ) : (
          <div onClick={() => handleEdit(record)}>{record.amount}</div>
        );
      },
    },
    {
      title: "Image",
      key: "image",
      render: (_, record) => (
        <Image
          src={getImagePath(record.product.image) || "/assets/no-image.png"}
          alt="product-img"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => handleSave(record.id, record.productId)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <a onClick={handleCancel}>Cancel</a>
          </span>
        ) : (
          <Space>
            <EditButton onEdit={() => handleEdit(record)} />
            <DeleteButton onDelete={() => onDelete(record.id)} />
          </Space>
        );
      },
    },
  ];

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: (keys: React.Key[], selectedRows: ICart[]) => {
        setSelectedRowKeys(keys);
        setSelectedCart(selectedRows);
      },
    }),
    [selectedRowKeys, setSelectedCart]
  );

  const defaultFooter = () => {
    if (selectedRowKeys.length === 0 || !carts) return <></>;

    return (
      <div className="-footer">
        {selectedRowKeys.length === carts.length ? (
          <Button onClick={handleClearCart} style={{ marginBottom: 12 }} danger>
            Clear your cart
          </Button>
        ) : (
          <Button onClick={handleClearCart} style={{ marginBottom: 12 }} danger>
            Remove selected product from your cart
          </Button>
        )}
      </div>
    );
  };

  const tableProps = {
    bordered: true,
    footer: defaultFooter,
  };

  return (
    <div className="-cart-table table">
      <div className="-title">
        <Link href="/products" className="-icon">
          <IconArrowLeft />
          <h3>Go back renting</h3>
        </Link>
        <h3>Selected {selectedCart.length} items.</h3>
      </div>
      <Divider />
      <Form
        form={form}
        component={false}
        style={{
          width: 200,
        }}
      >
        <Table
          columns={columns}
          dataSource={carts}
          rowKey="id"
          rowSelection={rowSelection}
          {...tableProps}
        />
      </Form>
    </div>
  );
};

export default CartTable;
