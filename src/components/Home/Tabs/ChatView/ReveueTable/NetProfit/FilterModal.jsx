import { useAuth } from "@/context/AuthContext";
import { Button, DatePicker, Form, Modal } from "antd";
import { useState } from "react";

const FilterModal = (props) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const res = await (
      await fetch("/api/sales/stats", {
        body: JSON.stringify({
          apiKey: user?.apiKey,
          startDate: props?.startDate,
          endDate: props?.endDate,
        }),
        method: "POST",
      })
    ).json();
    props?.setData(res);
    setIsLoading(false);
    props?.close();
  };

  return (
    <Modal
      title="Filter"
      open={props.show}
      footer={null}
      onCancel={() => {
        props.close();
      }}
    >
      <div className="flex items-center w-full">
        <Form
          size="large"
          name="basic"
          onFinish={() => fetchData()}
          className="flex items-center flex-col w-full space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col space-y-2">
              <span className="text-base text-black">Start date</span>
              <Form.Item name="startDate">
                <DatePicker
                  placeholder="Start date"
                  className="p-3 border placeholder:text-base placeholder:text-[#777777] border-[#1569BD] rounded-[5px] text-[#777777]"
                  style={{
                    background: "rgba(21, 105, 189, 0.06)",
                  }}
                  onChange={(e) => {
                    props?.setStartDate(e);
                  }}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-base text-black">End date</span>
              <Form.Item name="endDate">
                <DatePicker
                  disabledDate={(current) =>
                    current && current.valueOf() < props?.startDate
                  }
                  placeholder="End date"
                  className="p-3 border placeholder:text-base placeholder:text-[#777777] border-[#1569BD] rounded-[5px] text-[#777777]"
                  style={{
                    background: "rgba(21, 105, 189, 0.06)",
                  }}
                  onChange={(e) => {
                    props?.setEndDate(e);
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button
              className="bg-primary focus:bg-primary"
              size="large"
              type="primary"
              htmlType="submit"
            >
              {isLoading ? "Getting..." : "Apply"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default FilterModal;
