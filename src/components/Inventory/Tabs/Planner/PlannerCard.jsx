import TextSkeletonSingle from "@/components/utils/TextSkeletonSingle";

const PlannerCard = ({ title, amount, loading }) => {
  return (
    <div
      className="bg-white rounded-md flex items-center justify-between p-5"
      style={{
        boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">{title}</span>
        <span className="text-lg font-semibold">
          {loading ? (
            <TextSkeletonSingle />
          ) : (
            `R ${Number(amount)?.toLocaleString("en-US", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          )}
        </span>
      </div>
      {/* <div>{icon}</div> */}
    </div>
  );
};

export default PlannerCard;
