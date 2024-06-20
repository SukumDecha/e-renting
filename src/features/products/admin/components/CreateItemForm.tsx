"use client";
import ECTButton from "@/features/shared/components/button";
import { IconPlus } from "@tabler/icons-react";
import { Form, Input, InputNumber, Upload } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { useUiStore } from "@/features/shared/stores/UiStore";
import { useCreateProduct } from "../../hooks/api";
import { IAddProduct } from "../type";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

const CreateItemForm = () => {
  const router = useRouter();
  const openNotification = useUiStore((state) => state.openNotification);
  const { mutateAsync } = useCreateProduct();
  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (data: IAddProduct) => {
    try {
      await mutateAsync(data);

      openNotification({
        type: "success",
        message: "Successfully added",
        description: `${data.name} has been added to renting stock`,
      });
      router.push("/dashboard/products");
    } catch (e) {
      openNotification({
        type: "error",
        message: "Failed to add",
        description: `There was an error occurs while adding product.`,
      });
    }
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      const file = info.file.originFileObj as RcFile;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (info.file.status === "removed") {
      setImage(undefined);
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
          type="danger"
          style={{
            marginBottom: "1rem",
          }}
          fullWidth={true}
          onClick={handleBack}
        >
          Go back
        </ECTButton>
        <h1>Let&apos;s add new product into the system</h1>
        <p>
          Fill the form to add new product to let other can borrow this item
        </p>

        <div className="-image">
          <Image
            src={image || "/assets/no-image.png"}
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
        encType="multipart/form-data"
      >
        <Form.Item
          label="Enter Product name"
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
              message: "Quantity must be at least 1",
            },
          ]}
        >
          <InputNumber placeholder="Enter item amount" />
        </Form.Item>

        <Form.Item
          label="Upload product's picture"
          name="image"
          rules={[
            {
              required: true,
              message: "Please upload a product picture",
            },
          ]}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            onChange={handleImageChange}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <IconPlus />
              <div style={{ marginTop: 4 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <ECTButton type="secondary" htmlType="submit">
            Add new product
          </ECTButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateItemForm;
