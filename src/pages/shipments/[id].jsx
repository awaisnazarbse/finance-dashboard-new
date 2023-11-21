import Loader from "@/components/utils/Loader";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/layout";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const ShipmentDetails = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(
    ["shipment-detail"],
    async () => {
      const response = await axios.post(`/api/inventory/shipments/${id}`, {
        apiKey: user?.apiKey,
      });
      console.log("shipment details", response.data);
      return response.data;
    },
    {
      enabled: !!user || !!id,
    }
  );

  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-xs text-[#777777]">No.</span>
        </div>
      ),
      dataIndex: "index",
      render: (_, record, index) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-xs text-black">{index + 1}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Product Name</span>
        </div>
      ),
      dataIndex: "reference",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <Link
            href={
              record?.seller_listing?.takealot_uri
                ? record?.seller_listing?.takealot_uri
                : "#"
            }
            target="_blank"
            className="text-xs text-black"
          >
            {record?.seller_listing?.title || "-"}
          </Link>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-xs text-[#777777]">Required</span>
        </div>
      ),
      dataIndex: "quantity_required",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <span className="text-xs text-black">
            {record?.quantity?.required}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-xs text-[#777777]">Sending</span>
        </div>
      ),
      dataIndex: "quantity_sending",
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
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-xs text-[#777777]">Recieved</span>
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
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Shipment details</title>
      </Head>
      <DashboardLayout title={`Shipment - ${data?.shipment?.reference}`}>
        <main className="bg-[#E8ECF1] flex flex-col space-y-4 p-5">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-3 items-center justify-center">
              <span className="text-lg font-semibold">Details</span>
              <div className="w-full flex md:items-center md:justify-between md:space-x-6 flex-wrap gap-5">
                <div className="flex flex-col">
                  <span className="font-semibold">ID</span>
                  <span>{data?.shipment?.shipment_id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Reference</span>
                  <span>{data?.shipment?.reference}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Due Date</span>
                  <span>{data?.shipment?.due_date?.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Shipped</span>
                  <span>{data?.shipment?.shipped ? "Yes" : "No"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Warehouse</span>
                  <span>{data?.shipment?.warehouse?.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Facility</span>
                  <span>{data?.shipment?.facility?.code}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Tracking</span>
                  <span>{data?.shipment?.tracking_info}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3 items-center justify-center">
              <span className="text-lg font-semibold">Products</span>
              <div className="w-full bg-white p-2 rounded-md">
                <Table
                  columns={columns}
                  dataSource={data?.shipment_items}
                  id="newOrders"
                  rootClassName="orders-table"
                  scroll={{ x: 500 }}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </>
  );
};

export default ShipmentDetails;
