import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { ImArrowDown } from "react-icons/im";
import { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import AnalysisCardsSkeleton from "@/components/utils/AnalysisCardsSkeleton";
import { Tooltip } from "antd";

const Card = ({
  title,
  value,
  percentage,
  currencySign = true,
  onClick,
  statsLoading,
  iButton,
}) => {
  const [infoActive, setInfoActive] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <div
        className="bg-white shadow-lg p-5 flex flex-col space-y-4 justify-between relative rounded-[5px]"
        style={{
          boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        }}
      >
        <div className="flex flex-col space-y-1">
          <span className="text-[#777777] text-sm">{title}</span>
          {statsLoading ? (
            <AnalysisCardsSkeleton />
          ) : (
            <span className="text-black text-base font-semibold">
              {currencySign ? "R " : ""}
              {title === "Unit Sold Total" || title === "Return Total"
                ? value
                : Number(value)?.toLocaleString("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </span>
          )}
        </div>
        {/* <div className="flex items-center space-x-2">
          {statsLoading ? (
            <AnalysisCardsSkeleton />
          ) : (
            <>
              <div
                className="flex items-center justify-center p-1 bg-[#0BA3A3] rounded-[5px]"
                style={{
                  backgroundColor:
                    title === "Takealot Fee" && Number(percentage) <= 0
                      ? "#0BA3A3"
                      : Number(percentage) >= 0
                      ? "#0BA3A3"
                      : "rgb(220 38 38)",
                }}
              >
                {Number(percentage) >= 0 ? (
                  <BiTrendingUp color="white" size={10} />
                ) : (
                  <BiTrendingDown color="white" size={10} />
                )}
              </div>

              <span
                className="text-[#0BA3A3] text-sm"
                style={{
                  color:
                    title === "Takealot Fee" && Number(percentage) <= 0
                      ? "#0BA3A3"
                      : Number(percentage) >= 0
                      ? "#0BA3A3"
                      : "rgb(220 38 38)",
                }}
              >
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </span>
            </>
          )}
        </div> */}
        <div className="w-full flex items-center left-0 justify-center absolute -bottom-2">
          <div
            className="w-6 h-6 bg-[#F7B614] cursor-pointer rounded-full flex items-center justify-center"
            onClick={() => {
              onClick();
            }}
          >
            <ImArrowDown color="white" size={12} />
          </div>
        </div>
        <Tooltip title={iButton} rootClassName="text-[10px]">
          <BsInfoCircleFill
            className="absolute top-0 right-3 cursor-pointer"
            onMouseEnter={() => setInfoActive(true)}
            onMouseLeave={() => setInfoActive(false)}
            size={16}
            color="#777777"
          />
        </Tooltip>
        {/* {infoActive && (
          <div className="bg-white shadow-lg w-fit absolute top-4 transition-all duration-500 right-6 p-2 rounded-lg">
            {iButton}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Card;
