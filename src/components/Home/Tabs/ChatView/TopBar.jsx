import { useAuth } from "@/context/AuthContext";
import { Button, Select, DatePicker, Input, AutoComplete } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const { RangePicker } = DatePicker;

const TopBar = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  duration,
  setDuration,
  aggregatedBy,
  setAggregatedBy,
  setOverallStats,
  setSearchedText,
  searchedText,
  offers,
  setProductTitle,
  offersLoading,
  userApiKeys,
  setMarketplace,
  marketplace
}) => {
  console.log("offer in chartview", offers);
  const [openRangePicker, setOpenRangePicker] = useState(false);

  return (
    <div
      className="bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between w-full p-3 sticky top-0 z-50"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
      }}
    >
      <div className="flex space-x-2 items-center relative">
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
          loading={offersLoading}
          showSearch
          showArrow={false}
          placeholder="Search here..."
          className="rounded-lg text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none w-96"
          style={{ border: "1px solid #C2BDBD" }}
          bordered={false}
        />
        {/* <Input
            onChange={(e) => setSearchedText(e?.target.value)}
            prefix={
              <Image
                alt="alt text"
                src="/icons/search.svg"
                width={15}
                height={15}
              />
            }
            placeholder="Search here"
            className="py-1 px-2 text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none w-fit"
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
        </Select> */}
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
              setAggregatedBy("Hourly");
              setOpenRangePicker(false);
            }
            if (e === "This Year") {
              setStartDate(dayjs().startOf("year"));
              setEndDate(dayjs().endOf("year"));
              // setStartDate(new Date(new Date().getFullYear(), 0, 1));
              // setEndDate(new Date(new Date().getFullYear(), 11, 31));
              setAggregatedBy("Monthly");
              setOpenRangePicker(false);
            }
            if (e === "Yesterday") {
              setStartDate(
                new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
              );
              setEndDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000));
              setAggregatedBy("Hourly");
              setOpenRangePicker(false);
            }
            if (e === "This Month") {
              // setStartDate(
              //   new Date(new Date().getFullYear(), new Date().getMonth(), 2)
              // );
              // console.log(
              //   "new Date(new Date().getFullYear(), new Date().getMonth(), 1)",
              //   new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              // );
              // setEndDate(
              //   new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
              // );
              const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              setStartDate(dayjs().startOf("month").tz(userTimezone));
              setEndDate(dayjs().endOf("month").tz(userTimezone));
              setAggregatedBy("Weekly");
              setOpenRangePicker(false);
            }
            if (e === "Last Month") {
              // setStartDate(
              //   new Date(
              //     new Date(
              //       new Date().getFullYear(),
              //       new Date().getMonth() - 1,
              //       2
              //     )
              //   )
              // );
              // setEndDate(
              //   new Date(
              //     new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              //   )
              // );
              setStartDate(dayjs().subtract(1, "month").startOf("month"));
              setEndDate(dayjs().subtract(1, "month").endOf("month"));
              setAggregatedBy("Weekly");
              setOpenRangePicker(false);
            }
            if (e === "Custom") {
              setAggregatedBy("Daily");
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
            className="bg-white shadow-lg p-5 rounded-lg absolute top-14 left-32 topbar-range-picker z-50 flex flex-col space-y-2"
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
                // setOpenRangePicker(false);
              }}
              // open={openRangePicker}
              disabled={
                duration === "Today" ||
                duration === "This Month" ||
                duration === "Last Month" ||
                duration === "Yesterday"
                // duration === "This Year"
              }
            />
          </div>
        )}
        <div className="flex space-x-2 items-center">
          <span className="text-sm">Aggregated by</span>
          <Select
            placeholder="Aggregated by"
            value={aggregatedBy}
            options={[
              { label: "Hourly", value: "Hourly" },
              { label: "Daily", value: "Daily" },
              { label: "Weekly", value: "Weekly" },
              { label: "Monthly", value: "Monthly" },
              // { label: "This Year", value: "This Year" },
              // { label: "Quaterly", value: "Quaterly" },
            ]}
            onChange={(e) => {
              setAggregatedBy(e);
              // if (e === "Today") {
              //   setStartDate(new Date());
              //   setEndDate(new Date());
              // }
              // if (e === "This Year") {
              //   setStartDate(new Date(new Date().getFullYear(), 0, 1));
              //   setEndDate(new Date(new Date().getFullYear(), 11, 31));
              // }
              // if (e === "Yesterday") {
              //   setStartDate(
              //     new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
              //   );
              //   setEndDate(
              //     new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
              //   );
              // }
              // if (e === "This Month") {
              //   setStartDate(
              //     new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              //   );
              //   setEndDate(
              //     new Date(
              //       new Date().getFullYear(),
              //       new Date().getMonth() + 1,
              //       0
              //     )
              //   );
              // }
              // if (e === "Last Month") {
              //   setStartDate(
              //     new Date(
              //       new Date(
              //         new Date().getFullYear(),
              //         new Date().getMonth() - 1,
              //         1
              //       )
              //     )
              //   );
              //   setEndDate(
              //     new Date(
              //       new Date(new Date().getFullYear(), new Date().getMonth(), 0)
              //     )
              //   );
              // }
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
            className="border border-[#C2BDBD] w-40 rounded-md"
          />
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
