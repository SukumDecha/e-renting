import RequestTable from "@/features/requests/components/request-table";
import React from "react";

const RequestPage = () => {
  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "2rem",
  };

  return (
    <>
      <h1 style={titleStyle}>ประวัติการยืม</h1>
      <br />
      <RequestTable />
    </>
  );
};

export default RequestPage;
