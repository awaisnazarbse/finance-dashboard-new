import { Modal, Progress, Table } from "antd";
import Link from "next/link";

const ShipmentsModal = (props) => {
  const columns = [
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Shipment Id
          </span>
        </div>
      ),
      dataIndex: "shipment_id",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-[10px] font-light text-black">
            {record?.shipment_id || "-"}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Reference
          </span>
        </div>
      ),
      dataIndex: "reference",
      render: (_, record) => (
        <div className="w-full flex items-center py-3">
          <Link
            href={`/shipments/${record?.shipment_id}`}
            target="_blank"
            className="text-[10px] font-light text-black"
          >
            {record?.reference || "-"}
          </Link>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            % Of Units Recieved
          </span>
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
          <span className="text-[10px] font-light text-[#777777]">Status</span>
        </div>
      ),
      dataIndex: "status",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-[10px] font-light text-black">
            {record?.purchase_order_data?.status || "-"}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center space-x-4">
          <span className="text-[10px] font-light text-[#777777]">
            Due Date
          </span>
        </div>
      ),
      dataIndex: "due_date",
      render: (_, record) => (
        <div className="w-full flex items-center">
          <span className="text-[10px] font-light text-black">
            {record?.due_date?.date || "-"}
          </span>
        </div>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      props?.setShipmentsData(selectedRows)
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Modal
      title={"Choose shipments"}
      open={props.show}
      footer={null}
      onCancel={() => {
        if (props?.data) {
          props?.setData(null);
        }
        props.close();
      }}
      width={1000}
    >
      <Table
        columns={columns}
        dataSource={props?.shipments?.map((e) => {
          return {
            ...e,
            key: e?.shipment_id,
          };
        })}
        scroll={{ x: 500 }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
          defaultSelectedRowKeys: props?.shipmentsData?.map((e) => e?.shipment_id)
        }}
        pagination={{
          pageSize: 5,
        }}
      />
    </Modal>
  );
};

export default ShipmentsModal;
