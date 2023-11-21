import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const { RangePicker } = DatePicker;

const TopBar = ({
  setSearchedText,
  userApiKeys,
  marketplace,
  setMarketplace,
  duration,
  setDuration,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [openRangePicker, setOpenRangePicker] = useState(false);

  return (
    <div className="bg-white flex items-center space-x-2 justify-between w-full p-3">
      <div className="flex items-center space-x-2 relative">
        <Input
          prefix={
            <Image
              alt="alt text"
              src="/icons/search.svg"
              width={15}
              height={15}
            />
          }
          onChange={(e) => setSearchedText(e.target.value)}
          placeholder="Search product, offer id, tsin, sku..."
          className="py-[.3rem] px-2 w-auto md:w-96 text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none"
          style={{
            background: "rgba(21, 105, 189, 0.06)",
          }}
          styles={{
            input: {
              border: "none",
              background: "transparent",
            },
          }}
        />

        <Select
          placeholder="Today"
          value={duration}
          options={[
            { label: "Today", value: "Today" },
            { label: "Yesterday", value: "Yesterday" },
            { label: "This Month", value: "This Month" },
            { label: "Last Month", value: "Last Month" },
            { label: "This Year", value: "This Year" },
            { label: "Custom", value: "Custom" },
          ]}
          onChange={(e) => {
            setDuration(e);
            if (e === "Today") {
              setStartDate(new Date());
              setEndDate(new Date());
              setOpenRangePicker(false);
            }
            if (e === "This Year") {
              setStartDate(dayjs().startOf("year"));
              setEndDate(dayjs().endOf("year"));
              setOpenRangePicker(false);
            }
            if (e === "Yesterday") {
              setStartDate(
                new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
              );
              setEndDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000));
              setOpenRangePicker(false);
            }
            if (e === "This Month") {
              setStartDate(dayjs().startOf("month"));
              setEndDate(dayjs().endOf("month"));
              setOpenRangePicker(false);
            }
            if (e === "Last Month") {
              setStartDate(dayjs().subtract(1, "month").startOf("month"));
              setEndDate(dayjs().subtract(1, "month").endOf("month"));
              setOpenRangePicker(false);
            }
            if (e === "Custom") {
              setOpenRangePicker(true);
            }
          }}
          suffixIcon={
            <Image
              alt="alt text"
              src="/icons/downarrow.svg"
              width={13}
              height={5}
            />
          }
          bordered={false}
          className="border border-[#C2BDBD] w-40 rounded-md text-sm"
        />
        {openRangePicker && (
          <div
            className="bg-white shadow-lg p-5 rounded-lg absolute top-14 left-44 topbar-range-picker z-50 flex flex-col space-y-2"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
            }}
          >
            <div className="w-full flex items-center justify-end">
              <span
                className="cursor-pointer"
                onClick={() => setOpenRangePicker(false)}
              >
                X
              </span>
            </div>
            <span className="text-sm">Select custom date range</span>
            <RangePicker
              value={[dayjs(startDate), dayjs(endDate)]}
              className="p-3 border border-[#C2BDBD]"
              format={"DD MMM YYYY"}
              onChange={(e) => {
                setStartDate(e[0]);
                setEndDate(e[1]);
              }}
              disabled={
                duration === "Today" ||
                duration === "This Month" ||
                duration === "Last Month" ||
                duration === "Yesterday"
              }
            />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex px-1 md:px-4 md:space-x-2 items-center border border-[#C2BDBD] rounded-md">
          <Image
            alt="alt text"
            src="/icons/market.svg"
            width={18}
            height={18}
          />
          <Select
            placeholder="All market places"
            options={[
              { label: "All market places", value: "All market places" },
              ...userApiKeys?.map((key) => {
                return { label: key?.seller_name, value: key?.apiKey };
              }),
            ]}
            value={marketplace}
            onChange={(e) => setMarketplace(e)}
            suffixIcon={
              <Image
                alt="alt text"
                src="/icons/downarrow.svg"
                width={13}
                height={5}
              />
            }
            bordered={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
