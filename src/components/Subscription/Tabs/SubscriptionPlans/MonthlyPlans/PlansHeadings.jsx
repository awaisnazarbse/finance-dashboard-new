import Image from "next/image";
import PlanRow from "./PlanRow";

const PlansHeadings = () => {
  return (
    <div className="flex flex-col border border-[#C7B7B7]">
      <div
        className="flex flex-col space-y-4 p-5 h-32 w-full"
        style={{
          background: "#E3E4E9",
        }}
      >
        <span className="text-2xl text-black font-semibold">Our Plans</span>
        <div className="flex items-center space-x-2">
          <Image alt="alt text" src="/icons/price-tag.svg" width={32} height={30} />
          <span className="text-black text-base">Price</span>
        </div>
      </div>
      <div
        className="flex flex-col space-y-4 max-w-xs"
        style={{
          background: "#F0ECEC",
        }}
      >
        <PlanRow img="/icons/order.svg" title="Order Per Month" />
        <PlanRow
          img="/icons/email.svg"
          title="Follow-up emails or reviews request per month"
        />
        <PlanRow img="/icons/user.svg" title="Additional Seller Account" />
        <PlanRow img="/icons/user-1.svg" title="Additional Users" />
        <PlanRow img="/icons/reports.svg" title="Automated Reports" />
        <PlanRow
          img="/icons/dashboard.svg"
          title="Real time profit dashboard"
        />
        <PlanRow img="/icons/alert.svg" title="Listing Change Alert" />
        <PlanRow img="/icons/ppc.svg" title="PPC Optimization" />
        <PlanRow img="/icons/inventory.svg" title="Inventory Managemnt" />
        <PlanRow img="/icons/refund.svg" title="Refund For Lost Entry" />
        <PlanRow img="/icons/ltv.svg" title="LTV Dasboard" />
        <PlanRow img="" title="Select Plan" />
      </div>
    </div>
  );
};

export default PlansHeadings;
