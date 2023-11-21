import Loader from "@/components/utils/Loader";
import { Button } from "antd";
import Link from "next/link";
import { BsBarChartFill } from "react-icons/bs";
import MoreOptionModal from "./MoreOptionModal";
import { useState } from "react";
import TextSkeleton from "@/components/utils/TextSkeleton";
import TextSkeletonSingle from "@/components/utils/TextSkeletonSingle";

const SkeletonCard = () => {
  const [moreModal, setMoreModal] = useState(false);
  return (
    <div className="bg-white p-5 flex flex-col space-y-4 justify-between rounded-[10px] relative min-h-full">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#F7B614] flex items-center justify-center">
              <BsBarChartFill color="white" size={20} />
            </div>
            <span className="text-[#777777] text-sm">Sales</span>
          </div>
          <span className="text-[#0BA3A3] text-sm font-bold">
            <TextSkeleton />
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <TextSkeletonSingle />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full">
        <div className="flex flex-col space-y-1">
          <TextSkeleton />
        </div>
        <div className="flex flex-col space-y-1">
          <TextSkeleton />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full border-b border-b-[#BDBDBD] border-t border-t-[#BDBDBD] py-6">
        <div className="flex flex-col space-y-1">
          <TextSkeleton />
        </div>
        <div className="flex flex-col space-y-1">
          <TextSkeleton />
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button
          type="link"
          onClick={() => setMoreModal(true)}
          className="text-[#1569BD] text-sm"
        >
          More
        </Button>
      </div>
    </div>
  );
};

export default SkeletonCard;
