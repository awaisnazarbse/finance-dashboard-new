import TextSkeletonSingle from "@/components/utils/TextSkeletonSingle";

const PlannerCard = ({ title, poCount, totalCost, totalUnits, loading }) => {
  return (
    <div
      className="bg-white rounded-md flex items-center justify-between"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <div className="flex flex-col space-y-2 w-full">
        <div
          className="w-full rounded-t-md p-4"
          style={{
            background:
              title === "Draft"
                ? "#E5E5E5"
                : title === "Ordered"
                ? "#FBBF22"
                : "#79C1D9",
          }}
        >
          <span
            className="text-sm font-medium"
            style={{ color: title === "Draft" ? "#77797B" : "white" }}
          >
            {title}
          </span>
        </div>
        <div className="p-3 grid grid-cols-3">
          <div className="flex flex-col space-y-2 items-center">
            <span className="text-sm">PO Count</span>
            <span className="text-sm">
              {loading ? <TextSkeletonSingle /> : poCount}
            </span>
          </div>
          <div className="flex flex-col space-y-2 items-center">
            <span className="text-sm">Total Cost</span>
            <span className="text-sm">
              {loading ? <TextSkeletonSingle /> : totalCost}
            </span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Total Units</span>
            <span className="text-sm">
              {loading ? <TextSkeletonSingle /> : totalUnits}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerCard;
