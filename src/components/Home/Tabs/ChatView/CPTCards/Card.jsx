const Card = ({ title, cpt, jhp }) => {
  return (
    <div className="bg-white p-5 pb-1 flex flex-col space-y-4 justify-between rounded-[5px]">
      <span className="text-[#777777] text-base">{title}</span>
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-1">
          <span className="text-black text-base">CPT</span>
          <span className="text-black font-medium text-sm">${cpt}</span>
        </div>
        <div className="h-16 w-2 bg-[#F7B614]"></div>
        <div className="flex flex-col space-y-1">
          <span className="text-black text-base font-normal">JHP</span>
          <span className="text-black font-medium text-sm">${jhp}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
