import BusinessPlan from "./BusinessPlan";
import EnterprisePlan from "./EnterprisePlan";
import PlansHeadings from "./PlansHeadings";
import ProfessionalPlan from "./ProfessionalPlan";
import StandardPlan from "./StandardPlan";

const MonthlyPlans = () => {
  return (
    <div className="grid grid-cols-5 space-x-4 p-5 bg-white">
      <PlansHeadings />
      <StandardPlan price={59} />
      <ProfessionalPlan price={59} />
      <BusinessPlan price={59} />
      <EnterprisePlan price={59} />
    </div>
  );
};

export default MonthlyPlans;
