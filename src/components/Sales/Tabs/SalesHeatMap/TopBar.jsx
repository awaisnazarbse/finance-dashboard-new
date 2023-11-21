import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const { RangePicker } = DatePicker;

const TopBar = ({ setDuration, setType}) => {
  // const [isDatePicker, setIsDatePicker] = useState(false);
  // const handleChange = (e) => {
  //   let newDates = [];
  //   if (e !== "Custom range") {
  //     setIsDatePicker(false);
  //   }
  //   if (e === "Month to date/Yesterday/This month/Last month") {
  //     newDates = [
  //       {
  //         title: "Month to date",
  //         start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //         end: new Date(),
  //       },
  //       {
  //         title: "Yesterday",
  //         start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //         end: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //       },
  //       {
  //         title: "This month",
  //         start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //         end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  //       },
  //       {
  //         title: "Last month",
  //         start: new Date(
  //           new Date().getFullYear(),
  //           new Date().getMonth() - 1,
  //           1
  //         ),
  //         end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  //       },
  //     ];
  //   }
  //   if (e === "Today/Yesterday/This month/Last month") {
  //     newDates = [
  //       {
  //         title: "Today",
  //         start: new Date(),
  //         end: new Date(),
  //       },
  //       {
  //         title: "Yesterday",
  //         start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //         end: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //       },
  //       {
  //         title: "This month",
  //         start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //         end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  //       },
  //       {
  //         title: "Last month",
  //         start: new Date(
  //           new Date().getFullYear(),
  //           new Date().getMonth() - 1,
  //           1
  //         ),
  //         end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
  //       },
  //     ];
  //   }
  //   if (e === "Today/Yesterday/7 days/14 days") {
  //     const today = dayjs();
  //     // 7 days ago
  //     const sevenDaysAgoStart = today
  //       .subtract(7, "day")
  //       .startOf("day")
  //       .toDate();
  //     const sevenDaysAgoEnd = today.subtract(1, "day").endOf("day").toDate();
  //     // 14 days ago
  //     const fourteenDaysAgoStart = today
  //       .subtract(14, "day")
  //       .startOf("day")
  //       .toDate();
  //     const fourteenDaysAgoEnd = today.subtract(1, "day").endOf("day").toDate();
  //     newDates = [
  //       {
  //         title: "Today",
  //         start: new Date(),
  //         end: new Date(),
  //       },
  //       {
  //         title: "Yesterday",
  //         start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //         end: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  //       },
  //       {
  //         title: "7 days ago",
  //         start: sevenDaysAgoStart,
  //         end: sevenDaysAgoEnd,
  //       },
  //       {
  //         title: "14 days ago",
  //         start: fourteenDaysAgoStart,
  //         end: fourteenDaysAgoEnd,
  //       },
  //     ];
  //   }
  //   if (e === "This week/Last week/2 weeks ago/3 weeks ago") {
  //     const today = dayjs();

  //     // This week
  //     const thisWeekStart = today.startOf("week").toDate();
  //     const thisWeekEnd = today.endOf("week").toDate();

  //     // Last week
  //     const lastWeekStart = today.subtract(1, "week").startOf("week").toDate();
  //     const lastWeekEnd = today.subtract(1, "week").endOf("week").toDate();

  //     // 2 weeks ago
  //     const twoWeeksAgoStart = today
  //       .subtract(2, "week")
  //       .startOf("week")
  //       .toDate();
  //     const twoWeeksAgoEnd = today.subtract(1, "week").endOf("week").toDate();

  //     // 3 weeks ago
  //     const threeWeeksAgoStart = today
  //       .subtract(3, "week")
  //       .startOf("week")
  //       .toDate();
  //     const threeWeeksAgoEnd = today.subtract(1, "week").endOf("week").toDate();
  //     newDates = [
  //       {
  //         title: "This week",
  //         start: thisWeekStart,
  //         end: thisWeekEnd,
  //       },
  //       {
  //         title: "Last week",
  //         start: lastWeekStart,
  //         end: lastWeekEnd,
  //       },
  //       {
  //         title: "2 weeks ago",
  //         start: twoWeeksAgoStart,
  //         end: twoWeeksAgoEnd,
  //       },
  //       {
  //         title: "3 weeks ago",
  //         start: threeWeeksAgoStart,
  //         end: threeWeeksAgoEnd,
  //       },
  //     ];
  //   }
  //   if (e === "This month/Last month/2 months ago/3 months ago") {
  //     const today = dayjs();

  //     // This month
  //     const thisMonthStart = today.startOf("month").toDate();
  //     const thisMonthEnd = today.endOf("month").toDate();

  //     // Last month
  //     const lastMonthStart = today
  //       .subtract(1, "month")
  //       .startOf("month")
  //       .toDate();
  //     const lastMonthEnd = today.subtract(1, "month").endOf("month").toDate();

  //     // 2 months ago
  //     const twoMonthsAgoStart = today
  //       .subtract(2, "month")
  //       .startOf("month")
  //       .toDate();
  //     const twoMonthsAgoEnd = today
  //       .subtract(1, "month")
  //       .endOf("month")
  //       .toDate();

  //     // 3 months ago
  //     const threeMonthsAgoStart = today
  //       .subtract(3, "month")
  //       .startOf("month")
  //       .toDate();
  //     const threeMonthsAgoEnd = today
  //       .subtract(1, "month")
  //       .endOf("month")
  //       .toDate();

  //     newDates = [
  //       {
  //         title: "This month",
  //         start: thisMonthStart,
  //         end: thisMonthEnd,
  //       },
  //       {
  //         title: "Last month",
  //         start: lastMonthStart,
  //         end: lastMonthEnd,
  //       },
  //       {
  //         title: "2 months ago",
  //         start: twoMonthsAgoStart,
  //         end: twoMonthsAgoEnd,
  //       },
  //       {
  //         title: "3 months ago",
  //         start: threeMonthsAgoStart,
  //         end: threeMonthsAgoEnd,
  //       },
  //     ];
  //   }
  //   if (e === "Today/Yesterday/2 days ago/3 days ago") {
  //     const today = dayjs();

  //     // Yesterday
  //     const yesterdayStart = today.subtract(1, "day").startOf("day").toDate();
  //     const yesterdayEnd = today.subtract(1, "day").endOf("day").toDate();

  //     // 2 days ago
  //     const twoDaysAgoStart = today.subtract(2, "day").startOf("day").toDate();
  //     const twoDaysAgoEnd = today.subtract(1, "day").endOf("day").toDate();

  //     // 3 days ago
  //     const threeDaysAgoStart = today
  //       .subtract(3, "day")
  //       .startOf("day")
  //       .toDate();
  //     const threeDaysAgoEnd = today.subtract(1, "day").endOf("day").toDate();

  //     newDates = [
  //       {
  //         title: "Today",
  //         start: new Date(),
  //         end: new Date(),
  //       },
  //       {
  //         title: "Yesterday",
  //         start: yesterdayStart,
  //         end: yesterdayEnd,
  //       },
  //       {
  //         title: "2 days ago",
  //         start: twoDaysAgoStart,
  //         end: twoDaysAgoEnd,
  //       },
  //       {
  //         title: "3 days ago",
  //         start: threeDaysAgoStart,
  //         end: threeDaysAgoEnd,
  //       },
  //     ];
  //   }
  //   if (e === "Today/Yesterday/7 days ago/8 days ago") {
  //     const today = dayjs();

  //     // Yesterday
  //     const yesterdayStart = today.subtract(1, "day").startOf("day").toDate();
  //     const yesterdayEnd = today.subtract(1, "day").endOf("day").toDate();

  //     // 7 days ago
  //     const sevenDaysAgoStart = today
  //       .subtract(7, "day")
  //       .startOf("day")
  //       .toDate();
  //     const sevenDaysAgoEnd = today.subtract(1, "day").endOf("day").toDate();

  //     // 8 days ago
  //     const eightDaysAgoStart = today
  //       .subtract(8, "day")
  //       .startOf("day")
  //       .toDate();
  //     const eightDaysAgoEnd = today.subtract(1, "day").endOf("day").toDate();

  //     newDates = [
  //       {
  //         title: "Today",
  //         start: new Date(),
  //         end: new Date(),
  //       },
  //       {
  //         title: "Yesterday",
  //         start: yesterdayStart,
  //         end: yesterdayEnd,
  //       },
  //       {
  //         title: "7 days ago",
  //         start: sevenDaysAgoStart,
  //         end: sevenDaysAgoEnd,
  //       },
  //       {
  //         title: "8 days ago",
  //         start: eightDaysAgoStart,
  //         end: eightDaysAgoEnd,
  //       },
  //     ];
  //   }

  //   if (e === "Custom range") {
  //     setIsDatePicker(true);
  //   }

  //   setDates(newDates);
  // };
  return (
    <div
      className="bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between w-full p-3 sticky top-0 z-50"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
      }}
    >
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-start md:items-center md:space-x-2">
        <div className="flex md:px-4 space-x-2 items-center border border-[#C2BDBD] rounded-md w-fit text-sm relative">
          <Image
            alt="alt text"
            src="/icons/calendar.svg"
            width={15}
            height={15}
          />
          <Select
            placeholder="30 days"
            suffixIcon={
              <Image
                alt="alt text"
                src="/icons/downarrow.svg"
                width={13}
                height={5}
              />
            }
            options={[
              {
                label: "15 days",
                value: "15 days",
              },
              {
                label: "30 days",
                value: "30 days",
              },
              {
                label: "60 days",
                value: "60 days",
              },
              {
                label: "90 days",
                value: "90 days",
              },
              {
                label: "180 days",
                value: "180 days",
              },
              // {
              //   label: "This week/Last week/2 weeks ago/3 weeks ago",
              //   value: "This week/Last week/2 weeks ago/3 weeks ago",
              // },
              // {
              //   label: "This month/Last month/2 months ago/3 months ago",
              //   value: "This month/Last month/2 months ago/3 months ago",
              // },
              // {
              //   label: "Today/Yesterday/2 days ago/3 days ago",
              //   value: "Today/Yesterday/2 days ago/3 days ago",
              // },
              // {
              //   label: "Today/Yesterday/7 days ago/8 days ago",
              //   value: "Today/Yesterday/7 days ago/8 days ago",
              // },
              // {
              //   label: "Custom range",
              //   value: "Custom range",
              // },
            ]}
            onChange={(e) => setDuration(e)}
            className="w-fit text-sm placeholder:text-sm"
            bordered={false}
            dropdownStyle={{
              fontSize: ".6rem",
            }}
          />
          {/* {isDatePicker && (
            <div
              className="bg-white shadow-lg p-5 rounded-lg absolute top-14 left-32 topbar-range-picker z-50 flex flex-col space-y-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
              }}
            >
              <span className="text-sm">Select custom date range</span>
              <RangePicker
                // value={[dayjs(startDate), dayjs(endDate)]}
                className="p-3 border border-[#C2BDBD]"
                format={"DD MMM YYYY"}
                onChange={(e) => {
                  // setStartDate(e[0]);
                  // setEndDate(e[1]);
                  // setOpenRangePicker(false);
                  setDates([
                    {
                      title: "Custom range",
                      start: dayjs(e[0]).toDate(),
                      end: dayjs(e[1]).toDate(),
                    },
                  ]);
                }}
                // open={openRangePicker}
                clearIcon={null}
              />
            </div>
          )} */}
        </div>
        <div className="border border-[#C2BDBD] rounded-md w-fit text-sm relative">
          <Select
            placeholder="By units"
            suffixIcon={
              <Image
                alt="alt text"
                src="/icons/downarrow.svg"
                width={13}
                height={5}
              />
            }
            options={[
              {
                label: "By units",
                value: "By units",
              },
              {
                label: "By sales",
                value: "By sales",
              },
            ]}
            onChange={(e) => setType(e)}
            className="w-fit text-sm placeholder:text-sm"
            bordered={false}
            dropdownStyle={{
              fontSize: ".6rem",
            }}
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
