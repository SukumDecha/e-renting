"use client";

import { Divider, Form } from "antd";
import { useState } from "react";
import { DatePicker, Space } from "antd";
import ECTButton from "@/features/shared/components/button";
import TextArea from "antd/es/input/TextArea";
import { useUiStore } from "@/features/shared/stores/UiStore";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/shared/stores/CartStore";
import { useBorrowItem } from "@/features/requests/hooks/api";

const { RangePicker } = DatePicker;

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: borrowItem, error } = useBorrowItem();
  const carts = useCartStore((state) => state.selectedCart);
  const openNotification = useUiStore((state) => state.openNotification);
  const router = useRouter();

  const totalQuantity = carts.reduce(
    (total, cart) => (total += cart.amount),
    0
  );

  const totalCart = carts ? carts.length : 0;

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const requestDate = values.date[0].toISOString();
      const returnDate = values.date[1].toISOString();

      for (let i = 0; i < carts.length; i++) {
        const cart = carts[i];

        await borrowItem({
          cartId: cart.id,
          productId: cart.productId,
          productQuantity: cart.amount,
          reason: values.reason,
          requestDate,
          returnDate,
        });

        if (error) {
          openNotification({
            message: "Error",
            description: error.message,
            type: "error",
          });
          return;
        }
      }

      openNotification({
        message: "Success",
        description: "Successfully borrowed item",
        type: "success",
      });
      router.push("/requests");
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="-cart-summary">
      <h4 className="-title">Rental Summary</h4>
      <Divider />
      <div className="-desc">
        <p>Items: {totalCart}</p>
        <p>Quantity: {totalQuantity}</p>
      </div>

      <Space direction="vertical" style={{ width: "100%", marginTop: 16 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Why are you renting this product"
            name="reason"
            rules={[
              { required: true, message: "Please select a date range!" },
              { min: 8, message: "Reason must be at least 8 characters long" },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Pick Date"
            name="date"
            rules={[{ required: true, message: "Please select a date range!" }]}
          >
            <RangePicker />
          </Form.Item>
          <ECTButton
            color="primary"
            htmlType="submit"
            disabled={totalCart === 0}
            loading={loading}
          >
            Click to borrow
          </ECTButton>
        </Form>
      </Space>
    </div>
  );
};

export default CartSummary;
