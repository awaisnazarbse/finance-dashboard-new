import { Button, Input, Select } from "antd";
import Image from "next/image";

const TopBar = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between w-full p-5">
      <div className="flex items-center">
        <Input
          prefix={<Image alt="search icon" src="/icons/search.svg" width={15} height={15} />}
          placeholder="Search here"
          className="py-3 px-5 text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none"
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
      </div>
      <div className="flex items-center">
        <div
          className="flex items-center justify-between space-x-5 rounded-[5px] p-2"
          style={{
            background: "rgba(21, 105, 189, 0.06)",
          }}
        >
          <span className="text-[.8rem] md:text-base">Tracking: 8/10</span>
          <Button className="btn-primay px-5 py-[1.2rem] flex items-center justify-center border-none outline-none text-white text-base bg-[#1569BD] w-fit">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
