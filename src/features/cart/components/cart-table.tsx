"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
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

const CartTable = () => {
  const [carts, setCarts] = useState<ICart[]>([]);
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

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch data");

      const data: ICart[] = await res.json();
      setCarts(data);
    } catch (error) {
      console.error("Fetch error: ", error);
      message.error("Failed to load carts");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
      message.success(`Removed cart #${id} successfully`);
    } catch {
      message.error(`Error while deleting cart #${id}`);
    }
  }, []);

  const edit = useCallback(
    (record: Partial<ICart> & { id: React.Key }) => {
      form.setFieldsValue({ quantity: record.amount });
      setEditingKey(record.id);
    },
    [form]
  );

  const cancel = useCallback(() => setEditingKey(null), []);

  const save = useCallback(
    async (key: React.Key, productId: number) => {
      try {
        const { quantity } = await form.validateFields();
        const updatedQuantity = parseInt(quantity, 10);

        const updatedCarts = carts.map((cart) =>
          cart.id === key ? { ...cart, amount: updatedQuantity } : cart
        );

        setCarts(updatedCarts);
        setSelectedCart(updatedCarts);

        await fetch(`/api/cart/${key}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: updatedQuantity,
            productId,
          }),
        });

        message.success(`Updated cart #${key} successfully`);
        setEditingKey(null);
      } catch {
        message.error(`Error while updating cart #${key}`);
      }
    },
    [form, carts, setSelectedCart]
  );

  const handleClearCart = useCallback(async () => {
    selectedCart.forEach(async (c) => await handleDelete(c.id));

    clearSelectedCart();
    setSelectedRowKeys([]);
  }, [handleDelete, clearSelectedCart, selectedCart]);

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
          <div onClick={() => edit(record)}>{record.amount}</div>
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
              onClick={() => save(record.id, record.productId)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <Space>
            <EditButton onEdit={() => edit(record)} />
            <DeleteButton onDelete={() => handleDelete(record.id)} />
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
    if (selectedRowKeys.length === 0) return <></>;

    if (selectedRowKeys.length === carts.length) {
    }
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
