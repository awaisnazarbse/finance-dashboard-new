const SubCard = ({ title, cpt, jhb, currencySign = true }) => {
  return (
    <div className="bg-white p-5 pb-1 flex flex-col space-y-4 justify-between rounded-[5px]">
      <span className="text-[#777777] text-sm">{title}</span>
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-1">
          <span className="text-black text-sm">CPT</span>
          <span className="text-black font-medium text-sm">
            {currencySign && "R "}
            {cpt
              ? Number(cpt)?.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "-"}
          </span>
        </div>
        <div className="h-16 w-2 bg-[#F7B614]"></div>
        <div className="flex flex-col space-y-1">
          <span className="text-black text-sm font-normal">JHB</span>
          <span className="text-black font-medium text-sm">
            {currencySign && "R "}
            {jhb
              ? Number(jhb)?.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubCard;
