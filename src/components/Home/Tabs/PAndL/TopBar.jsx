import { getLast12Months } from "@/utils/getLast12Months";
import { getLast3MonthsWeeks } from "@/utils/getLast3MonthsWeeks";
import { Select, DatePicker, Input } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const { RangePicker } = DatePicker;

const TopBar = ({
  dates,
  setDates,
  duration,
  setDuration,
  aggregatedBy,
  setAggregatedBy,
  setSearchedText,
  searchedText,
  setCols,
  setProductTitle,
  offers,
  userApiKeys,
  marketplace,
  setMarketplace,
  page = "p&l",
  setBottomTableDates,
  setBottomTableDuration,
}) => {
  const [openRangePicker, setOpenRangePicker] = useState(false);
  return (
    <div
      className="bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between w-full p-3 sticky top-0 z-50"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
      }}
    >
      <div className="flex space-x-2 items-center relative">
        {page === "trend" ? (
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
        ) : (
          <Select
            options={
              offers?.length > 0 && [
                { label: "All Products", value: "" },
                ...offers?.map((offer) => ({ value: offer?.title })),
              ]
            }
            onSelect={(e) => {
              setProductTitle(e);
            }}
            showSearch
            showArrow={false}
            placeholder="Search here..."
            className="rounded-lg text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none w-96"
            style={{ border: "1px solid #C2BDBD" }}
            bordered={false}
          />
        )}
        <div className="flex md:px-4 space-x-2 items-center border border-[#C2BDBD] rounded-md w-fit text-sm relative">
          <Image
            alt="alt text"
            src="/icons/calendar.svg"
            width={15}
            height={15}
          />
          <Select
            placeholder="Last 3 Months, by week"
            options={
              page === "p&l"
                ? [
                    {
                      label: "Last 12 Months, by month",
                      value: "Last 12 Months",
                    },
                    { label: "Last 3 Months, by week", value: "Last 3 Months" },
                    { label: "Last 30 Days, by day", value: "Last 30 Days" },
                    // { label: "Custom", value: "Custom" },
                  ]
                : [
                    {
                      label: "Last 12 Months, by month",
                      value: "Last 12 Months",
                    },
                    { label: "Last 3 Months, by week", value: "Last 3 Months" },
                    { label: "Last 30 Days, by day", value: "Last 30 Days" },
                    { label: "Custom", value: "Custom" },
                  ]
            }
            bordered={false}
            onChange={(e) => {
              setDuration(e);
              if (page === "p&l") setBottomTableDuration(e);
              if (e === "Last 12 Months") {
                setDates([
                  dayjs().subtract(12, "months").startOf("month"),
                  dayjs(),
                ]);
                if (page === "p&l")
                  setBottomTableDates([
                    dayjs().subtract(12, "months").startOf("month"),
                    dayjs(),
                  ]);
                setOpenRangePicker(false);
              }
              if (e === "Last 3 Months") {
                setDates([
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() - 2 - 1,
                    1
                  ),
                  new Date(new Date().getFullYear(), new Date().getMonth(), 0),
                ]);
                if (page === "p&l")
                  setBottomTableDates([
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() - 2 - 1,
                      1
                    ),
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      0
                    ),
                  ]);
                setOpenRangePicker(false);
              }
              if (e === "Last 30 Days") {
                setDates([
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate() - 29 - 1
                  ),
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate()
                  ),
                ]);
                if (page === "p&l")
                  setBottomTableDates([
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate() - 29 - 1
                    ),
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    ),
                  ]);

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
            className="w-64 rounded-md text-sm"
          />
          {openRangePicker && (
            <div
              className="bg-white shadow-lg p-5 rounded-lg absolute top-14 left-32 topbar-range-picker w-full z-50 flex flex-col space-y-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
            >
              <span className="text-sm">Select custom date range</span>
              <RangePicker
                className="p-3 border border-[#C2BDBD]"
                format={"DD MMM YYYY"}
                onChange={(e) => {
                  setDates([e[0].toDate(), e[1].toDate()]);
                  if (page === "p&l")
                    setBottomTableDates([e[0].toDate(), e[1].toDate()]);
                }}
              />
            </div>
          )}
        </div>
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
