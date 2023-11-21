import Image from "next/image";

const PlanRow = ({ img, title }) => {
  return (
    <div className="flex items-center space-x-2 p-5 h-20 border-b border-b-[#CEC9C9]">
      {img !== "" && <Image alt="alt text" src={img} width={32} height={30} />}
      <span className="text-black text-base">{title}</span>
    </div>
  );
};

export default PlanRow;
