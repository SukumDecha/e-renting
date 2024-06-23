import { Divider, Form, Input } from "antd";
import { useState } from "react";
import { ICart } from "../type";
import { DatePicker, Space } from "antd";
import ECTButton from "@/features/shared/components/button";
import TextArea from "antd/es/input/TextArea";

const { RangePicker } = DatePicker;

interface IProps {
  carts: ICart[];
}

const CartSummary = ({ carts }: IProps) => {
  const totalQuantity = carts.reduce(
    (total, cart) => (total += cart.amount),
    0
  );

  const totalCart = carts ? carts.length : 0;

  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);

      // Format startDate and endDate to YYYY-MM-DD HH:MM:SS
      const startDate = values.date[0]
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const endDate = values.date[1]
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      console.log(startDate);
      console.log(endDate);

      const response = await fetch("api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carts: carts.map((cart) => ({
            productId: cart.productId,
            startDate,
            endDate,
          })),
        }),
      });

      console.log("API Response:", response);
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false); // Stop loading
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
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Why are you renting this product"
            name="reason"
            rules={[{ required: true, message: "Please select a date range!" }]}
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
            Send Request
          </ECTButton>
        </Form>
      </Space>
    </div>
  );
};

export default CartSummary;
