import {
  Table,
  Popconfirm,
  Button,
  message,
  Modal,
  Image as AntdImage,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import purchasedOrdersApi from "@/lib/purchasedOrders";
import SelectedProductsModal from "./SelectedProductsModal";
import { useState } from "react";
import dayjs from "dayjs";

const RecordsTable = ({ data, isLoading, searchedText, suppliers }) => {
  const queryClient = useQueryClient();
  const [selectedProductModal, setSelectedProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState();
  const deleteMutation = useMutation(
    async (id) => {
      await purchasedOrdersApi.deletePurchasedOrder(id);
    },
    {
      onSuccess: () => {
        message.success("Purchase order removed successfully!");
        queryClient.invalidateQueries(["purchased_orders"]);
      },
    }
  );

  const getTotalCost = (products) => {
    let totalCost = 0;
    products?.forEach((e) => {
      let thisCost = Number(e?.unitsOrdered) * Number(e?.totalCostPerUnit);
      totalCost += Number(thisCost);
    });
    return totalCost;
  };

  const getTotalUnits = (products) => {
    let totalUnits = 0;
    products?.forEach((e) => {
      totalUnits += Number(e?.unitsOrdered);
    });
    return totalUnits;
  };

  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">PO date</span>
        </div>
      ),
      dataIndex: "date",
      render: (_, record) => (
        <div className="w-full flex items-center py-2">
          <span className="text-[10px] text-black">
            {dayjs(record?.date).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.supplierName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.currency).includes(value) ||
          String(record.email).includes(value) ||
          String(record.website).includes(value) ||
          String(record.comments).includes(value)
        );
      },
    },
    // {
    //   title: (
    //     <div className="flex items-center space-x-4">
    //       <span className="text-[10px] text-[#777777]">PO number</span>
    //     </div>
    //   ),
    //   dataIndex: "id",
    //   render: (_, record) => (
    //     <div className="w-full flex items-center py-3">
    //       <span className="text-[10px] text-black">{record?.id}</span>
    //     </div>
    //   ),
    // },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">Supplier</span>
        </div>
      ),
      dataIndex: "supplier",
      render: (_, record) => (
        <div className="w-full flex items-center py-2">
          <span className="text-[10px] text-black">
            {suppliers?.find((e) => e?.id === record?.supplier)?.supplierName}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">Products</span>
        </div>
      ),
      dataIndex: "products",
      width: "200px",
      render: (_, record) => (
        <div className="w-full flex items-center py-2">
          {record?.products?.length > 1 ? (
            <span
              className="text-[10px] text-black hover:text-blue-600 cursor-pointer"
              onClick={() => {
                setSelectedProducts(record?.products);
                setSelectedProductModal(true);
              }}
            >
              Selected products: {record?.products?.length}
            </span>
          ) : (
            <div className="flex items-center space-x-4">
              <AntdImage
                src={record?.products[0]?.product?.image_url}
                width={80}
                height={40}
              />
              <span
                title={record?.products[0]?.product?.title}
                className="line-clamp-1 max-w-[20rem] text-[10px] text-black"
              >
                {record?.products[0]?.product?.title}
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: <span className="text-[10px] text-[#777777]">Total units</span>,
      dataIndex: "totalUnits",
      render: (_, record) => (
        <span className="text-[10px] text-black">
          {getTotalUnits(record?.products)}
        </span>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">Total cost</span>
        </div>
      ),
      dataIndex: "totalCost",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-[10px] text-black line-clamp-1">
            R {getTotalCost(record?.products)}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">Estimated arrival</span>
        </div>
      ),
      dataIndex: "estimatedArrival",
      render: (_, record) => (
        <div className="w-full flex items-center py-2">
          <span className="text-[10px] text-black line-clamp-1">
            {dayjs(record?.estimatedArrivalDate).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">Comments</span>
        </div>
      ),
      dataIndex: "comments",
      render: (_, record) => (
        <div className="w-full flex items-center py-2">
          <span className="text-[10px] text-black line-clamp-1">
            {record?.comments}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">Shipments</span>
        </div>
      ),
      dataIndex: "shipments",
      render: (_, record) => (
        <div className="w-full flex items-center py-2">
          {record?.shipments?.length > 0 ? (
            <span className="text-[10px] text-black line-clamp-1">
              Select shipments: {record?.shipments?.length}
            </span>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] text-[#777777]">Status</span>
        </div>
      ),
      dataIndex: "status",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div
            className="bg-gray-400 rounded-full px-3 py-1 flex items-center space-x-2 justify-between"
            style={{
              background:
                record?.status === "Draft"
                  ? "#DCDCDC"
                  : record?.status === "Ordered"
                  ? "#F7E9CD"
                  : record?.status === "Shipped"
                  ? "#D5E1F6"
                  : record?.status === "Closed"
                  ? "#D0E3D2"
                  : "#DCDCDC",
            }}
          >
            <Image
              src={
                record?.status === "Draft"
                  ? "/icons/status-draft.svg"
                  : record?.status === "Ordered"
                  ? "/icons/status-ordered.svg"
                  : record?.status === "Shipped"
                  ? "/icons/status-shipped.svg"
                  : record?.status === "Closed"
                  ? "/icons/status-closed.svg"
                  : "/icons/status-draft.svg"
              }
              width={14}
              height={14}
            />
            <span className="text-[10px] text-black">{record?.status}</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777]">Actions</span>
        </div>
      ),
      dataIndex: "actions",
      render: (_, record) => (
        <div className="w-full flex items-center justify-center">
          <Popconfirm
            placement="left"
            title={
              <div className="flex flex-col space-y-1">
                <Link
                  href={`/inventory/purchased-orders/${record?.id}`}
                  className="flex items-center space-x-2 text-[blue] hover:text-[blue] font-poppins"
                >
                  <BiEdit size={20} />
                  <span>Edit Details</span>
                </Link>
                <div
                  className="flex items-center space-x-2 text-[#D94B38] font-poppins cursor-pointer"
                  onClick={() => {
                    Modal.confirm({
                      title: "Confirm",
                      icon: <ExclamationCircleOutlined />,
                      content:
                        "Are you sure you want to delete this purchase order?",
                      okText: "Delete",
                      cancelText: "Cancel",
                      okType: "danger",
                      onOk: () => {
                        deleteMutation.mutate(record?.id);
                      },
                    });
                  }}
                >
                  <BiTrash size={20} />
                  <span>
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </span>
                </div>
              </div>
            }
            description=""
            icon={null}
          >
            <Image
              alt="alt text"
              className="cursor-pointer mr-5"
              src={"/icons/more.svg"}
              width={15}
              height={3}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="bg-white rounded-[10px] shadow-lg p-8 w-full flex flex-col space-y-8">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-semibold">Purchased Orders</h1>
          <Link
            href={"/inventory/purchased-orders/new"}
            className="bg-primary focus:bg-primary hover:bg-primary w-fit text-white px-4 py-2 rounded-md shadow-lg"
            size="large"
            type="primary"
          >
            Add new
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          // scroll={{ x: 2000 }}
          loading={isLoading}
        />
      </div>
      {selectedProductModal && (
        <SelectedProductsModal
          show={selectedProductModal}
          close={() => {
            setSelectedProductModal(false);
          }}
          data={selectedProducts}
          setData={setSelectedProducts}
        />
      )}
    </div>
  );
};

export default RecordsTable;
