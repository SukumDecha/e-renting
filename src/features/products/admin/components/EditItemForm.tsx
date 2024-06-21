"use client";
import ECTButton from "@/features/shared/components/button";
import { IconPlus } from "@tabler/icons-react";
import { Form, Input, InputNumber, Upload } from "antd";
import Image from "next/image";
import Link from "next/link";

const { TextArea } = Input;
import React from "react";

import { useUiStore } from "@/features/shared/stores/UiStore";
import { useEditProduct } from "../../hooks/api";
import { IProduct, IUpdateProduct } from "../type";
import { getImagePath } from "@/features/shared/helpers/upload";
import { useRouter } from "next/navigation";

interface IProps {
  product: IProduct;
}
const EditItemForm = ({ product }: IProps) => {
  const router = useRouter();
  const openNotification = useUiStore((state) => state.openNotification);
  const { mutateAsync } = useEditProduct(product.slug);
  const [form] = Form.useForm();

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (data: IUpdateProduct) => {
    try {
      await mutateAsync(data);

      openNotification({
        type: "success",
        message: "Successfully updated",
        description: `${data.name} has been updated`,
      });

      router.push("/dashboard/products");
    } catch (e) {
      openNotification({
        type: "error",
        message: "Failed to updated",
        description: `There was an error occurs while updating product.`,
      });
    }
  };

  return (
    <div
      className="form"
      style={{
        maxWidth: 820,
      }}
    >
      <div className="-description">
        <ECTButton
          color="danger"
          style={{
            marginBottom: "1rem",
          }}
          fullWidth
          onClick={handleBack}
        >
          Go back
        </ECTButton>
        <h1>Edit Product info</h1>
        <p>Fill the form to edit this product...</p>

        <div className="-image">
          <Image
            src={getImagePath(product.image) || "/assets/no-image.png"}
            alt="adding-item"
            width={250}
            height={250}
          />
        </div>
      </div>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={handleSubmit}
        initialValues={{
          name: product.name,
          description: product.description,
          quantity: product.quantity,
          image: undefined,
        }}
      >
        <Form.Item
          label="Edit Product name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="What's the item name" />
        </Form.Item>
        <Form.Item
          label="Enter Item Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the item description" },
          ]}
        >
          <TextArea rows={4} placeholder="Explain this item" />
        </Form.Item>
        <Form.Item
          label="Enter Product quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please enter the quantity",
            },
            {
              type: "number",
              min: 1,
              message: "Quantity must be atleast 1",
            },
          ]}
        >
          <InputNumber placeholder="Enter item amount" />
        </Form.Item>

        <Form.Item label="Upload product's picture" name="image">
          <Upload
            listType="picture-card"
            maxCount={1}
            type="drag"
            accept="image/*"
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <IconPlus />
              <div style={{ marginTop: 4 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <ECTButton color="secondary" htmlType="submit">
            Save changes
          </ECTButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditItemForm;
