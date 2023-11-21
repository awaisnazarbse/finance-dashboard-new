import { Button } from "antd";
import { BsBarChartFill } from "react-icons/bs";
import MoreOptionModal from "./MoreOptionModal";
import { useState } from "react";
import TextSkeleton from "@/components/utils/TextSkeleton";
import TextSkeletonSingle from "@/components/utils/TextSkeletonSingle";
import formatDateRange from "@/utils/formatDateRange";
import info from "@/constants/info";

const Card = ({
  data,
  isLoading,
  setStartDate,
  setEndDate,
  activeCardTitle,
  setActiveCardTitle,
}) => {
  const [moreModal, setMoreModal] = useState(false);
  return (
    <div
      className="bg-white p-5 flex flex-col space-y-4 justify-between rounded-[10px] relative min-h-full cursor-pointer"
      style={{
        border: data?.title === activeCardTitle ? "2px solid #F7B614" : "",
      }}
    >
      <div
        className="bg-white flex flex-col space-y-4 justify-between cursor-pointer"
        onClick={() => {
          setActiveCardTitle(data?.title);
          setStartDate(data?.startDate);
          setEndDate(data?.endDate);
        }}
      >
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#F7B614] flex items-center justify-center">
                <BsBarChartFill color="white" size={20} />
              </div>
              <span
                className="text-[#777777] text-sm"
                title={info.TOTAL_REVENUE}
              >
                Sales
              </span>
            </div>
            <span className="text-[#0BA3A3] text-sm font-bold">
              {isLoading ? <TextSkeleton /> : data?.title}
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            {isLoading ? (
              <TextSkeletonSingle />
            ) : (
              <>
                <span className="text-black text-lg font-semibold">
                  R {data?.earning}
                </span>
                <span className="text-[#777777] text-xs">
                  {formatDateRange(data?.startDate, data?.endDate)}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div className="flex flex-col space-y-1">
            {isLoading ? (
              <TextSkeleton />
            ) : (
              <>
                <span className="text-[#777777] text-sm">Orders / Unit</span>
                <span className="text-[#1569BD] text-sm">
                  {data?.orders}/{data?.unitSold}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            {isLoading ? (
              <TextSkeleton />
            ) : (
              <>
                <span
                  className="text-[#777777] text-sm"
                  title={info.RETURN_TOTAL}
                >
                  Returns
                </span>
                <span className="text-[#1569BD] text-sm">{data?.refunded}</span>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 w-full border-b border-b-[#BDBDBD] border-t border-t-[#BDBDBD] py-2">
          <div className="flex flex-col space-y-1">
            {isLoading ? (
              <TextSkeleton />
            ) : (
              <>
                <span
                  className="text-[#777777] text-sm"
                  title={info.GROSS_PROFIT}
                >
                  Gross Profit
                </span>
                <span className="text-[#1569BD] text-sm">
                  R {(data?.earning - data?.fee)?.toFixed(2)}
                  {/* {(data?.totalRevenue - data?.takealotFee - data?.cogs)?.toFixed(
                  2
                )} */}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            {isLoading ? (
              <TextSkeleton />
            ) : (
              <>
                <span
                  className="text-[#777777] text-sm"
                  title={info.ESTIMATED_PAYOUT}
                >
                  Est.Payouts
                </span>
                <span className="text-[#1569BD] text-sm">
                  R {(data?.earning - data?.fee).toFixed(2)}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div className="flex flex-col space-y-1">
            {isLoading ? (
              <TextSkeleton />
            ) : (
              <>
                <span
                  className="text-[#777777] text-sm"
                  title={info.NET_PROFIT}
                >
                  Net Profit
                </span>
                <span className="text-[#1569BD] text-sm">
                  R {(data?.earning - data?.fee - data?.expenses)?.toFixed(2)}
                  {/* {(data?.totalRevenue - data?.takealotFee - data?.cogs)?.toFixed(
                  2
                )} */}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button
          type="link"
          onClick={() => setMoreModal(true)}
          className="text-[#1569BD] text-sm"
          disabled={isLoading}
        >
          More
        </Button>
      </div>
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

export default Card;
