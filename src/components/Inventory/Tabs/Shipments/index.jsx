import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Button, Progress, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import DetailsModal from "./DetailsModal";
import Link from "next/link";

const Shipments = () => {
  const { user } = useAuth();
  const [detailsModal, setDetailsModal] = useState(false);
  const [id, setId] = useState();
  const { data, isLoading } = useQuery(
    ["shipments"],
    async () => {
      const response = await axios.post("/api/inventory/shipments", {
        apiKey: user?.apiKey,
      });
      console.log("shipments", response.data);
      return response.data;
    },
    {
      enabled: !!user,
    }
  );

  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Shipment Id</span>
        </div>
      ),
      dataIndex: "shipment_id",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-xs text-black">
            {record?.shipment_id || "-"}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Reference</span>
        </div>
      ),
      dataIndex: "reference",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <Link
            href={`/shipments/${record?.shipment_id}`}
            className="text-xs text-black"
          >
            {record?.reference || "-"}
          </Link>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">% Of Units Recieved</span>
        </div>
      ),
      dataIndex: "quantity_required",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <Progress
            percent={Math.floor(
              (record?.purchase_order_data?.received /
                record?.quantity?.sending) *
              100
            )}
          />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Quantity Sent</span>
        </div>
      ),
      dataIndex: "quantity_sent",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-xs text-black">
            {record?.quantity?.sending}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Quantity Recieved</span>
        </div>
      ),
      dataIndex: "quantity_received",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-xs text-black">
            {record?.purchase_order_data?.received}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Status</span>
        </div>
      ),
      dataIndex: "status",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-xs text-black">
            {record?.purchase_order_data?.status || "-"}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Due Date</span>
        </div>
      ),
      dataIndex: "due_date",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-xs text-black">
            {record?.due_date?.date || "-"}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Facility</span>
        </div>
      ),
      dataIndex: "status",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-xs text-black">
            {record?.facility?.code || "-"}
          </span>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-5">
      <div
        className="flex flex-col justify-between bg-white p-4 py-6 rounded-[10px] w-full"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        <Table
          columns={columns}
          dataSource={data?.shipments}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{ x: 500 }}
          pagination={{
            pageSize: 50,
          }}
        />
      </div>
      {detailsModal && (
        <DetailsModal
          show={detailsModal}
          close={() => {
            setDetailsModal(false);
          }}
          id={id}
        />
      )}
    </div>
  );
};

export default Shipments;
