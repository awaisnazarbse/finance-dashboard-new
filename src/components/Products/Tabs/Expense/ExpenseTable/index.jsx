import expensesApi from "@/lib/expense";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Popconfirm, Table, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { BiEdit, BiTrash } from "react-icons/bi";
import ExpenseModal from "../ExpenseModal";

const ExpenseTable = ({ offers, searchedText }) => {
  console.log("Offers in table", offers);
  const [expenseModal, setExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["expenses"], async () => {
    const data = await expensesApi.getExpenses();
    return data;
  });

  const deleteMutation = useMutation(
    async (id) => {
      await expensesApi.deleteExpense(id);
    },
    {
      onSuccess: () => {
        message.success("Expense removed successfully!");
        queryClient.invalidateQueries(["expenses"]);
      },
    }
  );

  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Date</span>
        </div>
      ),
      dataIndex: "date",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-[11px] text-black">
            {record?.type === "One off"
              ? record?.date
              : `${record?.date} - ${record?.endDate}`}
          </span>
        </div>
      ),
    },

    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Type</span>
        </div>
      ),
      dataIndex: "type",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px] text-black">{record?.type}</span>
          </div>
        </div>
      ),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.type).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).includes(value) ||
          String(record.category).includes(value) ||
          String(record.offer_id).includes(value)
        );
      },
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Name</span>
        </div>
      ),
      dataIndex: "name",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px] text-black">{record?.name}</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Category</span>
        </div>
      ),
      dataIndex: "category",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px] text-black">{record?.category}</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Product</span>
        </div>
      ),
      dataIndex: "product",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px] text-black max-w-xs">
              {offers?.find((e) => e?.offer_id === record?.offer_id)?.title}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Market Place</span>
        </div>
      ),
      dataIndex: "marketPlace",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px] text-black">All Marketplaces</span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Amount</span>
        </div>
      ),
      dataIndex: "amount",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px] text-[#0BA3A3]">
              R {Number(record?.amount)?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#777777]">Total Expense</span>
        </div>
      ),
      dataIndex: "totalExpense",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <div className="w-full flex items-center">
            <span className="text-[11px] text-[#0BA3A3]">
              R {Number(record?.totalExpense)?.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4 justify-center">
          <span className="text-[11px] text-[#777777]">Action</span>
        </div>
      ),
      dataIndex: "action",
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
                    setExpenseData(record);
                    setExpenseModal(true);
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
                      content: "Are you sure you want to delete this expense?",
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
      <div className="flex flex-col justify-between bg-white p-4 py-6 rounded-[10px] w-full">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data}
          id="newOrders"
          rootClassName="orders-table"
          scroll={{ x: 500 }}
        />
      </div>
      {expenseModal && (
        <ExpenseModal
          show={expenseModal}
          close={() => {
            setExpenseModal(false);
          }}
          data={expenseData}
          setData={setExpenseData}
          offers={offers}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
