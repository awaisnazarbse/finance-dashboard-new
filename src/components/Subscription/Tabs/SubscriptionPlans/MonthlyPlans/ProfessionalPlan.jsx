import { Button } from "antd";
import Image from "next/image";

const ProfessionalPlan = ({price}) => {
  return (
    <div className="flex flex-col border border-[#C7B7B7] bg-[#1569BD]">
      <div
        className="flex flex-col h-32 items-center justify-center p-5 w-full"
        style={{
          background: "#15CAB8",
        }}
      >
        <span className="text-2xl text-white font-semibold">Professional</span>
        <span className="text-2xl text-white font-bold">${price}</span>
        <span className="text-base text-[#777777] font-medium">Per Month</span>
      </div>
      <div className="flex flex-col space-y-4 max-w-xs">
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-white text-lg font-medium">3,000</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-white text-lg font-medium">160</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-white text-lg font-medium">6</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-white text-lg font-medium">8</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <span className="text-white text-lg font-medium">9</span>
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/check-white.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/check-white.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/check-white.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/cross-white.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/cross-white.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Image alt="alt text" src="/icons/cross-white.svg" width={24} height={24} />
        </div>
        <div className="flex h-20 items-center justify-center space-x-2 p-5 border-b border-b-[#CEC9C9]">
          <Button className="btn-primay px-7 py-6 flex items-center justify-center  outline-none text-white text-base font-medium border border-white w-fit">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPlan;
