import TextSkeletonSingle from "@/components/utils/TextSkeletonSingle";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const Row = ({
  title,
  value,
  type,
  isLoading,
  info,
  expandable = false,
  children,
  // activeTitle,
  // setActiveTitle
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        {expandable ? (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setActiveTitle(title);
              setIsOpened(!isOpened);
            }}
          >
            {isOpened && title === activeTitle ? (
              <MdOutlineKeyboardArrowDown
                className="cursor-pointer"
                onClick={() => {
                  setActiveTitle(title);
                  setIsOpened(false);
                }}
              />
            ) : (
              <MdOutlineKeyboardArrowRight
                className="cursor-pointer"
                onClick={() => {
                  setActiveTitle(title);
                  setIsOpened(true);
                }}
              />
            )}
            <span
              title={info}
              data-toggle="tooltip"
              style={{
                color: type === "header" ? "black" : "#777777",
                fontWeight: type === "header" ? "500" : "400",
                fontSize: ".7rem",
              }}
            >
              {title}
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <span
              title={info}
              data-toggle="tooltip"
              style={{
                color: type === "header" ? "black" : "#777777",
                fontWeight: type === "header" ? "500" : "400",
                fontSize: ".7rem",
              }}
            >
              {title}
            </span>
          </div>
        )}
        <span
          style={{
            color: type === "header" ? "black" : "#777777",
            fontWeight: type === "header" ? "500" : "400",
            fontSize: ".7rem",
          }}
        >
          {isLoading ? <TextSkeletonSingle /> : value}
        </span>
      </div>
      {isOpened && title === activeTitle ? (
        <div className="ml-5">{children}</div>
      ) : null}
    </div>
  );
};

export default Row;
