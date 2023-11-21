import { Button, Checkbox, DatePicker, Select } from "antd";
import ReportCard from "./ReportCard";
import Image from "next/image";

const { RangePicker } = DatePicker;

const ReportTypes = () => {
  const data = [
    {
      title: "Dashboard by day",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
    {
      title: "Dashboard by month",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
    {
      title: "Dashboard by products",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
    {
      title: "Orders",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
    {
      title: "Sales by product/month",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
    {
      title: "Advertising performace report",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
    {
      title: "Repeat customer performance report",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
    {
      title: "Stock history report",
      desc: `Contains all the data from the "More" menu (on the Dashboard page), broken down by days.`,
    },
  ];
  return (
    <div className="p-5 flex flex-col space-y-5">
      <h1 className="text-lg font-medium">Choose Option</h1>
      {data?.map((e, i) => (
        <ReportCard title={e?.title} desc={e?.desc} key={i} />
      ))}

      <div className="flex flex-col items-center space-y-5">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center md:justify-center md:space-x-5 w-full">
          <RangePicker
            className="report-range-picker w-52 border-[1.8px] text-base text-[#C2BDBD] border-[#C2BDBD] h-10"
            suffixIcon={
              <Image alt="alt text" src="/icons/calendar.svg" width={20} height={20} />
            }
          />
          <Select
            options={[
              { label: "PDF", value: "pdf" },
              { label: "Excel", value: "excel" },
            ]}
            className="w-52 rounded-[5px] p-1"
            bordered={false}
            style={{
              background: "white",
            }}
            placeholder="Select File Format"
            suffixIcon={
              <Image alt="alt text" src="/icons/downarrow.svg" width={13} height={5} />
            }
          />
        </div>
        <div>
          <Checkbox className="text-black text-base">
            Show detailed breakdown of Amazon fees, refund costs and COGS
          </Checkbox>
        </div>
        <Button className="btn-primay px-7 py-6 flex items-center justify-center border-none outline-none text-white text-base bg-[#F7B614] w-fit">
          Download
        </Button>
      </div>
    </div>
  );
};

export default ReportTypes;
