import { Empty } from "antd";
import React from "react";
import ECTButton from "./button";
import Link from "next/link";

interface IProps {
  reason?: string;
}
const NotFound = (
  { reason }: IProps = { reason: "This page doesn't existed" }
) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <Empty description={reason}>
        <ECTButton href="/">Go back to home page</ECTButton>
      </Empty>
    </div>
  );
};

export default NotFound;
