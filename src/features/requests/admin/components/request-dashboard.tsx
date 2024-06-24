"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { message, Space, Table, Button, Divider } from "antd";

import Image from "next/image";
import { getImagePath } from "@/features/shared/helpers/upload";
import { ColumnType } from "antd/es/table";
import { IRequest } from "../type";
import { formatDate, getDuration, renderStatus } from "../../helper";

const RequestDashboard = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/request");
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = (await res.json()) as IRequest[];
      setRequests(data);
    } catch (error) {
      console.error("Fetch error: ", error);
      message.error("Failed to load carts");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSave = useCallback(
    async (
      requestId: number,
      status: IRequest["status"],
      rejectionReason?: string
    ) => {
      try {
        const updatedRequest = requests.map((req) =>
          req.id === requestId ? { ...req, status } : req
        );

        setRequests(updatedRequest);

        await fetch(`/api/admin/request/${requestId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, rejectionReason }),
        });

        message.success(`${status} request #${requestId} successfully`);
      } catch {
        message.error(`Error while updating request #${requestId}`);
      }
    },
    [requests]
  );

  const handleApproveAll = useCallback(() => {
    selectedRowKeys.forEach(async (c) => await onSave(c as number, "APPROVED"));

    setSelectedRowKeys([]);
  }, [selectedRowKeys, onSave]);

  const handleRejectAll = useCallback(() => {
    selectedRowKeys.forEach(
      async (c) => await onSave(c as number, "REJECTED", "Out of stock")
    );

    setSelectedRowKeys([]);
  }, [selectedRowKeys, onSave]);

  const columns: ColumnType<IRequest>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div className="-avatar">
          {record.user.name}
          <Image
            src={
              getImagePath(record.user.image!) || "/assets/default-avatar.png"
            }
            alt="user-img"
            width={50}
            height={50}
          />
        </div>
      ),
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="-product">
          <p>{record.product.name}</p>
          <Image
            src={getImagePath(record.product.image) || "/assets/no-image.png"}
            alt="product-img"
            width={50}
            height={50}
          />
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.productQuantity - b.productQuantity,
      render: (_, record) => {
        return <p>{record.productQuantity}</p>;
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) =>
        getDuration(a.requestDate, a.returnDate) -
        getDuration(b.requestDate, b.returnDate),
      render: (_, record) => {
        const { requestDate, returnDate } = record;
        const dateFormat =
          formatDate(requestDate) + " - " + formatDate(returnDate);
        const duration = getDuration(requestDate, returnDate);

        return (
          <p>
            {dateFormat} ({duration} days)
          </p>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return <p>{renderStatus(record.status)}</p>;
      },
      filters: [
        {
          text: "PENDING",
          value: "PENDING",
        },
        {
          text: "RETURNED",
          value: "RETURNED",
        },
        {
          text: "APPROVED",
          value: "APPROVED",
        },
        {
          text: "REJECTED",
          value: "REJECTED",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value as string),
      filterSearch: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const status = record.status;

        if (status !== "PENDING") return <></>;

        return (
          <Space>
            <Button onClick={() => onSave(record.id, "APPROVED")}>
              Approve
            </Button>
            <Button
              onClick={() => onSave(record.id, "REJECTED", "Out of stock")}
            >
              Reject
            </Button>
          </Space>
        );
      },
    },
  ];

  const rowSelection = useMemo(
    () => ({
      selectedRowKeys,
      onChange: (keys: React.Key[]) => {
        setSelectedRowKeys(keys);
      },
    }),
    [selectedRowKeys]
  );

  const defaultFooter = () => {
    if (selectedRowKeys.length === 0) return <></>;

    return (
      <div className="-footer">
        <Space>
          <Button onClick={handleApproveAll} style={{ marginBottom: 12 }}>
            Approve all
          </Button>
          <Button onClick={handleRejectAll} style={{ marginBottom: 12 }} danger>
            Reject all
          </Button>
        </Space>
      </div>
    );
  };

  const tableProps = {
    bordered: true,
    footer: defaultFooter,
  };

  return (
    <div className="-request-table table">
      <h4 className="-title">Request Approval</h4>

      <Divider />
      <Table
        columns={columns}
        dataSource={requests}
        rowKey="id"
        rowSelection={rowSelection}
        {...tableProps}
      />
    </div>
  );
};

export default RequestDashboard;
