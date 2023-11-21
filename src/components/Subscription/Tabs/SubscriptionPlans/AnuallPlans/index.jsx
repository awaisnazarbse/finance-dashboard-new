import dynamic from "next/dynamic";

const PlansHeadings = dynamic(() => import("../MonthlyPlans/PlansHeadings"));
const StandardPlan = dynamic(() => import("../MonthlyPlans/StandardPlan"));
const ProfessionalPlan = dynamic(() =>
  import("../MonthlyPlans/ProfessionalPlan")
);
const BusinessPlan = dynamic(() => import("../MonthlyPlans/BusinessPlan"));
const EnterprisePlan = dynamic(() => import("../MonthlyPlans/EnterprisePlan"));

const AnaullPlans = () => {
  return (
    <div className="grid grid-cols-5 space-x-4 p-5 bg-white">
      <PlansHeadings />
      <StandardPlan price={32} />
      <ProfessionalPlan price={32} />
      <BusinessPlan price={32} />
      <EnterprisePlan price={32} />
    </div>
  );
};

export default AnaullPlans;
