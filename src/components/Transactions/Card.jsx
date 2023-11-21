import React from "react";

const Card = ({ title, amount, icon }) => {
  return (
    <div
      className="bg-white rounded-md flex items-center justify-between p-5"
      style={{
        boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">{title}</span>
        <span className="text-lg font-semibold">{amount}</span>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default Card;
