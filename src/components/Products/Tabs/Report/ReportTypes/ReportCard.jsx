import { useState } from "react";

const ReportCard = ({ title, desc }) => {
  const [active, setActive] = useState(false);
  const [activeCard, setActiveCard] = useState("");

  return (
    <div
      onClick={() => {
        setActiveCard(title);
        setActive(true);
      }}
      className="rounded-[10px] p-5 w-full flex flex-col space-y-2 cursor-pointer"
      style={{
        background: active && title === activeCard ? "#F7B614" : "white",
        color: active && title === activeCard ? "white" : "black",
        boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <span className="text-lg font-medium">{title}</span>
      <span className="text-base">{desc}</span>
    </div>
  );
};

export default ReportCard;
