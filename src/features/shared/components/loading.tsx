import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Spin tip="Loading" size="large" />
      <h4
        style={{
          marginTop: "1rem",
          fontSize: "20px",
          fontWeight: 300,
        }}
      >
        Loading....
      </h4>
    </div>
  );
};

export default Loading;
