"use client";
import ECTButton from "@/features/shared/components/shared/button";
import { IconPlus } from "@tabler/icons-react";
import { Form, Input, InputNumber, Upload, message } from "antd";
import Image from "next/image";
import Link from "next/link";

const { TextArea } = Input;
import React from "react";

const CreateItemForm = () => {
  const [form] = Form.useForm();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    // You can perform additional actions with the form values here, such as sending them to a server
    message.success("Product added successfully!");
  };

  const handleFailedSubmit = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please check the form for errors.");
  };

  return (
    <div
      className="form"
      style={{
        maxWidth: 820,
      }}
    >
      <div className="-description">
        <Link href="/">
          <ECTButton
            type="danger"
            style={{
              marginBottom: "1rem",
            }}
            fullWidth={false}
          >
            Go back
          </ECTButton>
        </Link>
        <h1>Let&apos;s add new product into the system</h1>
        <p>
          Fill the form to add new product to let other can borrow this item
        </p>

        <div className="-image">
          <Image
            src="/assets/adding-item.jpg"
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
        onFinishFailed={handleFailedSubmit}
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
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 1,
              message: "Please enter a valid quantity",
            },
          ]}
        >
          <InputNumber placeholder="Enter item amount" />
        </Form.Item>

        <Form.Item
          label="Upload product's picture"
          name="picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "Please upload a product picture",
              max: 1,
              min: 1,
            },
          ]}
        >
          <Upload
            action="/upload.do"
            listType="picture-card"
            maxCount={1}
            type="drag"
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <IconPlus />
              <div style={{ marginTop: 4 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <ECTButton type="secondary" buttonType="submit">
            Add new product
          </ECTButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateItemForm;
