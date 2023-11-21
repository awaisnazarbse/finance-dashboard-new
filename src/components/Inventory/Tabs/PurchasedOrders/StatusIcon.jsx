import Image from "next/image";

const StatusIcon = ({ icon, title, selectedStatus, onclick }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full bg-[#4E91FC]"
        style={{
          background: selectedStatus === title ? "#4E91FC" : "#F5F5F5",
        }}
        onClick={onclick}
      >
        <Image src={icon} width={18} height={18} />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default StatusIcon;
