import { Button } from "antd";
import Image from "next/image";

const EnterprisePlan = ({price}) => {
  return (
    <div className="flex flex-col border border-[#C7B7B7]">
      <div
        className="flex flex-col h-32 items-center justify-center p-5 w-full"
        style={{
          background: "rgba(21, 105, 189, 0.06)",
        }}
      >
        <span className="text-2xl text-black font-semibold">Enterprise</span>
        <span className="text-2xl text-black font-bold">${price}</span>
        <span className="text-base text-[#777777] font-medium">Per Month</span>
      </div>
      <div className="flex flex-col space-y-4 max-w-xs">
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-black text-lg font-medium">3,000</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-black text-lg font-medium">160</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-black text-lg font-medium">6</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-black text-lg font-medium">8</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-black text-lg font-medium">9</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/check.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/check.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/check.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/cross-red.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/cross-red.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/cross-red.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Button className="btn-primay px-7 py-6 flex items-center justify-center  outline-none text-[#1569BD] text-base font-medium border border-[#1569BD] w-fit">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePlan;
