import { useAuth } from "@/context/AuthContext";
import suppliersApi from "@/lib/suppliers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Popconfirm, Table, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useState } from "react";
import SuppliersModal from "./SuppliersModal";
import Image from "next/image";

const Suppliers = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [supplierData, setSupplierData] = useState(null);
  const { data, isLoading } = useQuery(
    ["suppliers"],
    async () => {
      const response = await suppliersApi.getSuppliers(user?.uid);
      console.log("suppliers", response.data);
      return response;
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const deleteMutation = useMutation(
    async (id) => {
      await suppliersApi.deleteSupplier(id);
    },
    {
      onSuccess: () => {
        message.success("Supplier removed successfully!");
        queryClient.invalidateQueries(["suppliers"]);
      },
    }
  );

  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Supplier name</span>
        </div>
      ),
      dataIndex: "supplierName",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-xs text-black">
            {record?.supplierName || "-"}
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
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Currency</span>
        </div>
      ),
      dataIndex: "currency",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-xs text-black">{record?.currency || "-"}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Email</span>
        </div>
      ),
      dataIndex: "email",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-xs text-black">{record?.email || "-"}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Website</span>
        </div>
      ),
      dataIndex: "website",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-xs text-black">{record?.website || "-"}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#777777]">Comments</span>
        </div>
      ),
      dataIndex: "comments",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <span className="text-xs text-black line-clamp-1">
            {record?.comments || "-"}
          </span>
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
              <div className="flex flex-col">
                <Button
                  type="link"
                  className="flex items-center space-x-2 text-[blue] hover:text-[blue] font-poppins"
                  onClick={() => {
                    setSupplierData(record);
                    setModalOpen(true);
                  }}
                >
                  <BiEdit size={20} />
                  Edit Details
                </Button>
                <Button
                  type="link"
                  className="flex items-center space-x-2 text-[#D94B38] font-poppins"
                  onClick={() => {
                    Modal.confirm({
                      title: "Confirm",
                      icon: <ExclamationCircleOutlined />,
                      content: "Are you sure you want to delete this supplier?",
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
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </Button>
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
      <div
        className="flex flex-col space-y-4 justify-between bg-white p-4 py-6 rounded-[10px] w-full"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <Input
            placeholder="Search suppliers..."
            prefix={<Image src="/icons/search.svg" width={10} height={10} />}
            className="w-fit"
            onChange={(e) => setSearchedText(e.target.value)}
          />
          <button
            className="bg-primary focus:bg-primary hover:bg-primary w-fit text-white px-4 py-2 rounded-md shadow-lg"
            size="large"
            type="primary"
            onClick={() => setModalOpen(true)}
          >
            Add supplier
          </button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          id="newOrders"
          loading={isLoading}
          rootClassName="orders-table"
          scroll={{ x: 500 }}
          pagination={{
            pageSize: 50,
          }}
        />
      </div>
      {modalOpen && (
        <SuppliersModal
          show={modalOpen}
          close={() => {
            setModalOpen(false);
          }}
          data={supplierData}
          setData={setSupplierData}
        />
      )}
    </div>
  );
};

export default Suppliers;
