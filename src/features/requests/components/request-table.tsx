"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { message, Table, Button, Divider, Tooltip } from "antd";

import Image from "next/image";
import { getImagePath } from "@/features/shared/helpers/upload";
import DeleteButton from "@/features/shared/components/dashboard/delete-button";
import { ColumnType } from "antd/es/table";
import { IconArrowBackUp, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { IRequest } from "../admin/type";
import { renderStatus } from "../helper";

const RequestTable = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/request");
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = (await res.json()) as IRequest[];
      setRequests(data);
    } catch (error) {
      console.error("Fetch error: ", error);
      message.error("Failed to load requests");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/request/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== id)
      );
      message.success(`Removed request #${id} successfully`);
    } catch {
      message.error(`Error while deleting cart #${id}`);
    }
  }, []);

  const handleClearCart = useCallback(async () => {
    selectedRowKeys.forEach(async (c) => await handleDelete(c as number));

    setSelectedRowKeys([]);
  }, [selectedRowKeys, handleDelete]);

  const save = useCallback(
    async (requestId: number) => {
      const status = "RETURNED" as const;

      try {
        const updatedRequest = requests.map((req) =>
          req.id === requestId ? { ...req, status } : req
        );

        setRequests(updatedRequest);

        await fetch(`/api/request/${requestId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });

        message.success(`Updated request #${requestId} successfully`);
      } catch {
        message.error(`Error while updating request #${requestId}`);
      }
    },
    [requests]
  );

  const columns: ColumnType<IRequest>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      responsive: ["lg"],
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
      render: (_, record) => {
        return <p>{record.productQuantity}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        if (record.status === "REJECTED") {
          return (
            <div className="-tag">
              {renderStatus(record.status, record.rejectionReason!)}
            </div>
          );
        }

        return <div className="-tag">{renderStatus(record.status)}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const status = record.status;

        if (status === "RETURNED") return <></>;

        if (status === "PENDING" || status === "REJECTED") {
          return (
            <Tooltip title="Delete this request">
              <DeleteButton onDelete={() => handleDelete(record.id)} />
            </Tooltip>
          );
        }

        return (
          <Tooltip title="Return this product">
            <Button
              shape="circle"
              color="green"
              onClick={() => save(record.id)}
              icon={<IconArrowBackUp />}
            />
          </Tooltip>
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
      getCheckboxProps: (record: IRequest) => ({
        disabled: record.status === "APPROVED",
      }),
    }),
    [selectedRowKeys]
  );

  const defaultFooter = () => {
    if (selectedRowKeys.length === 0) return <></>;

    return (
      <div className="-footer">
        <Button onClick={handleClearCart} style={{ marginBottom: 12 }} danger>
          Remove these requests
        </Button>
      </div>
    );
  };

  const tableProps = {
    bordered: true,
    footer: defaultFooter,
  };

  return (
    <div className="-request-table table">
      <div className="-title">
        <Link href="/products" className="-icon">
          <IconArrowLeft />
          <h3>Go back renting</h3>
        </Link>
        <h3>Selected {selectedRowKeys.length} items.</h3>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={requests}
        rowKey="id"
        rowSelection={rowSelection}
        {...tableProps}
        style={{
          overflow: "auto",
        }}
      />
    </div>
  );
};

export default RequestTable;
