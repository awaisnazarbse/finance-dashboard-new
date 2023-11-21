import { useState } from "react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";

const AnalysisCards = ({
  data,
  dates,
  setDates,
  isLoading,
  productTitle,
  setStartDate,
  setEndDate,
  activeCardTitle,
  setActiveCardTitle
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
      {data?.length > 0
        ? data?.map((e, i) => (
            <Card
              key={i}
              data={{
                ...e,
                startDate: dates[i]?.start,
                endDate: dates[i]?.end,
              }}
              isLoading={isLoading}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              activeCardTitle={activeCardTitle}
              setActiveCardTitle={setActiveCardTitle}
            />
          ))
        : [0, 1, 2, 3].map((e) => <SkeletonCard key={e} />)}
    </div>
  );
};

export default AnalysisCards;
