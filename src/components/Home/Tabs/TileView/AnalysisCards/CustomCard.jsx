import Loader from "@/components/utils/Loader";
import { Button } from "antd";
import Link from "next/link";
import { BsBarChartFill } from "react-icons/bs";
import MoreOptionModal from "./MoreOptionModal";
import { useState } from "react";

const CustomCard = ({ data, isLoading }) => {
  const [moreModal, setMoreModal] = useState(false);
  return (
    <div className="bg-white p-5 flex flex-col space-y-4 justify-between rounded-[10px] relative min-h-full">
      {isLoading ? (
        <>
          <div className="absolute z-50 bg-black bg-opacity-50 w-full h-full rounded-[10px] top-0 left-0 flex items-center justify-center">
            <Loader />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#F7B614] flex items-center justify-center">
                  <BsBarChartFill color="white" size={20} />
                </div>
                <span className="text-[#777777] text-sm">Sales</span>
              </div>
              <span className="text-[#0BA3A3] text-sm font-bold">
                {data?.title}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-black text-lg font-semibold">
                R {data?.earning}
              </span>
              <span className="text-[#777777] text-sm">
                {data?.startDate + " - " + data?.endDate}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Orders/Unit</span>
              <span className="text-[#1569BD] text-sm">
                {data?.orders}/{data?.unitSold}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Refund</span>
              <span className="text-[#1569BD] text-sm">{data?.refunded}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full border-b border-b-[#BDBDBD] border-t border-t-[#BDBDBD] py-6">
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Asv.Cost</span>
              <span className="text-[#1569BD] text-sm">-</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Est.Payouts</span>
              <span className="text-[#1569BD] text-sm">
                R {(data?.earning - data?.fee).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <Link href={"#"} className="text-[#1569BD] text-sm">
              More
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#F7B614] flex items-center justify-center">
                  <BsBarChartFill color="white" size={20} />
                </div>
                <span className="text-[#777777] text-sm">Sales</span>
              </div>
              <span className="text-[#0BA3A3] text-sm font-bold">
                {data?.title}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-black text-lg font-semibold">
                R {data?.earning}
              </span>
              <span className="text-[#777777] text-sm">
                {data?.startDate + " - " + data?.endDate}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Orders/Unit</span>
              <span className="text-[#1569BD] text-sm">
                {data?.orders}/{data?.unitSold}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Refund</span>
              <span className="text-[#1569BD] text-sm">{data?.refunded}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full border-b border-b-[#BDBDBD] border-t border-t-[#BDBDBD] py-6">
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Asv.Cost</span>
              <span className="text-[#1569BD] text-sm">-</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[#777777] text-sm">Est.Payouts</span>
              <span className="text-[#1569BD] text-sm">
                R {(data?.earning - data?.fee).toFixed(2)}
              </span>
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
        </>
      )}
      {moreModal && (
        <MoreOptionModal
          show={moreModal}
          close={() => {
            setMoreModal(false);
          }}
          data={data}
        />
      )}
    </div>
  );
};

export default CustomCard;
