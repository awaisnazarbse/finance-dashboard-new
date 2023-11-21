import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

const { RangePicker } = DatePicker;

const TopBar = ({
  setDates,
  offers,
  setProductTitle,
  userApiKeys,
  marketplace,
  setMarketplace,
  searchedText,
  setSearchedText
}) => {
  return (
    <div
      className="bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between w-full p-3 sticky top-0 z-50"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
      }}
    >
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-start md:items-center md:space-x-2">
        <Input
          prefix={<Image src="/icons/search.svg" width={15} height={15} />}
          showSearch
          onChange={(e) => setSearchedText(e.target.value)}
          value={searchedText}
          showArrow={false}
          placeholder="Search here..."
          className="rounded-lg text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none w-96"
          style={{ border: "1px solid #C2BDBD" }}
          bordered={false}
        />
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
