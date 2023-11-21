import dynamic from "next/dynamic";

const PlansHeadings = dynamic(() => import("../MonthlyPlans/PlansHeadings"));
const StandardPlan = dynamic(() => import("../MonthlyPlans/StandardPlan"));
const ProfessionalPlan = dynamic(() =>
  import("../MonthlyPlans/ProfessionalPlan")
);
const BusinessPlan = dynamic(() => import("../MonthlyPlans/BusinessPlan"));
const EnterprisePlan = dynamic(() => import("../MonthlyPlans/EnterprisePlan"));

const HalfYearPlans = () => {
  return (
    <div className="grid grid-cols-5 space-x-4 p-5 bg-white">
      <PlansHeadings />
      <StandardPlan price={49} />
      <ProfessionalPlan price={49} />
      <BusinessPlan price={49} />
      <EnterprisePlan price={49} />
    </div>
  );
};

export default HalfYearPlans;
