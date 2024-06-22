"use client";

import React, { useEffect, useState } from "react";
import { FloatButton, message, Space, Table, Form, InputNumber } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import Loading from "@/features/shared/components/loading";
import Image from "next/image";
import { getImagePath } from "@/features/shared/helpers/upload";
import DeleteButton from "@/features/shared/components/dashboard/delete-button";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ICart } from "../type";
import EditButton from "@/features/shared/components/dashboard/edit-button";

const CartList = () => {
  const [isLoading, setLoading] = useState(true);
  const [carts, setCarts] = useState<ICart[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        message.error(`Error while deleting: ${id}`);
        return;
      }

      setCarts((carts) => carts.filter((p) => p.id !== id));
      message.success(`Removed cart #${id} successfully`);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const isEditing = (record: ICart) => record.id === editingKey;

  const edit = (record: Partial<ICart> & { id: React.Key }) => {
    form.setFieldsValue({ quantity: "", ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (key: React.Key, productId: number) => {
    try {
      const row = await form.validateFields();

      const quantity = parseInt(row.quantity, 10);

      const newData = carts.map((item) =>
        item.id === key ? { ...item, amount: quantity } : item
      );

      setCarts(newData);

      await fetch(`/api/cart/${key}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: row.amount, productId }),
      });

      message.success(`Updated cart #${key} successfully`);
      setEditingKey(null);
    } catch (err) {
      message.error(`Error while updating cart #${key}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cart");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: ICart[] = await res.json();
        setCarts(data);
      } catch (error) {
        console.error("Fetch error: ", error);
        message.error("Failed to load carts");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  type EditableColumnType = ColumnType<ICart> & {
    editable?: boolean;
  };

  const columns: EditableColumnType[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a>{text}</a>,
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
            name="amount"
            style={{ margin: 0 }}
            rules={[
              { required: true, message: "Please input amount!" },
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
          <div
            className="editable-cell-value-wrap"
            onClick={() => edit(record)}
          >
            {record.amount}
          </div>
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
      render: (_, record: ICart) => {
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
            <EditButton handleEdit={() => edit(record)} />
            <DeleteButton handleDelete={() => handleDelete(record.id)} />
          </Space>
        );
      },
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="cart-list">
      <h4 className="-title">Cart Dashboard</h4>
      <FloatButton
        tooltip="Checkout"
        type="primary"
        shape="circle"
        icon={
          <div className="flex justify-center items-center">
            <IconPlus width={30} height={30} />
          </div>
        }
        onClick={() => router.push("/products")}
      />

      <Form form={form} component={false}>
        <Table columns={columns} dataSource={carts} rowKey="id" />
      </Form>
    </div>
  );
};

export default CartList;
