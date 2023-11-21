import { Input, Select } from "antd";
import Image from "next/image";
import { useState } from "react";
import ExpenseModal from "./ExpenseModal";

const TopBar = ({ offers, setSearchedText }) => {
  const [expenseModal, setExpenseModal] = useState(false);
  return (
    <div className="bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between w-full p-3">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-start md:items-center md:space-x-2">
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
          placeholder="Search here"
          className="py-1 px-3 text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none"
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
        <div className="flex px-4 space-x-2 items-center border border-[#C2BDBD] rounded-md w-fit">
          <Image
            alt="alt text"
            src="/icons/calendar.svg"
            width={18}
            height={18}
          />
          <Select
            placeholder="All Time"
            options={[
              {
                label: "Today",
                value: "Today",
              },
              {
                label: "This Week",
                value: "This Week",
              },
              {
                label: "Last Week",
                value: "Last Week",
              },
              {
                label: "This Month",
                value: "This Month",
              },
              {
                label: "Last Month",
                value: "Last Month",
              },
              {
                label: "This Year",
                value: "This Year",
              },
            ]}
            suffixIcon={
              <Image
                alt="alt text"
                src="/icons/downarrow.svg"
                width={13}
                height={5}
              />
            }
            bordered={false}
            className="w-32"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-start md:items-center md:space-x-4">
        <button
          className="p-1 md:px-4 md:py-1 flex items-center justify-between space-x-2 border border-[#C2BDBD] rounded-[5px]"
          onClick={() => setExpenseModal(true)}
        >
          <Image
            alt="alt text"
            src={"/icons/plus.svg"}
            width={14}
            height={14}
          />
          <span className="text-[#777777] text-base">Add Expense</span>
        </button>
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
          {/* <div className="cursor-pointer">
            <svg
              className="cursor-pointer"
              width="48"
              height="48"
              viewBox="0 0 57 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="57"
                height="50"
                rx="5"
                fill="#F7B614"
                fillOpacity="0.06"
              />
              <path
                d="M36 18.6C36 18.04 36 17.76 35.89 17.546C35.7945 17.3579 35.6419 17.2049 35.454 17.109C35.24 17 34.96 17 34.4 17H21.6C21.04 17 20.76 17 20.546 17.109C20.3578 17.2049 20.2049 17.3578 20.109 17.546C20 17.76 20 18.04 20 18.6V19.337C20 19.582 20 19.704 20.028 19.819C20.0525 19.9214 20.093 20.0193 20.148 20.109C20.209 20.209 20.296 20.296 20.468 20.469L25.531 25.531C25.704 25.704 25.791 25.791 25.852 25.891C25.907 25.981 25.948 26.079 25.972 26.181C26 26.295 26 26.416 26 26.655V31.411C26 32.268 26 32.697 26.18 32.955C26.2581 33.0666 26.3582 33.161 26.4741 33.2326C26.59 33.3041 26.7192 33.3512 26.854 33.371C27.165 33.417 27.549 33.226 28.315 32.842L29.115 32.442C29.437 32.282 29.597 32.202 29.714 32.082C29.8178 31.976 29.8967 31.8483 29.945 31.708C30 31.55 30 31.37 30 31.011V26.663C30 26.418 30 26.296 30.028 26.181C30.0525 26.0786 30.093 25.9807 30.148 25.891C30.208 25.791 30.295 25.705 30.465 25.535L30.469 25.531L35.532 20.469C35.704 20.296 35.79 20.209 35.852 20.109C35.9071 20.0193 35.9476 19.9214 35.972 19.819C36 19.706 36 19.584 36 19.345V18.6Z"
                stroke="#F7B614"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div> */}
        </div>
      </div>
      {expenseModal && (
        <ExpenseModal
          show={expenseModal}
          close={() => {
            setExpenseModal(false);
          }}
          offers={offers}
        />
      )}
    </div>
  );
};

export default TopBar;
