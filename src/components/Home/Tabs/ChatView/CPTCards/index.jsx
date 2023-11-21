import Card from "./Card";

const CPTCards = () => {
  return (
    <div
      className="card-container w-full md:w-[85vw]"
    >
      <Card title="Gross Profit" cpt="66,777.00" jhp="66,777.00" />
      <Card title="Cost of Good" cpt="66,777.00" jhp="66,777.00" />
      <Card title="Net Profit" cpt="66,777.00" jhp="66,777.00" />
      <Card title="Unit Sold Total" cpt="66,777.00" jhp="66,777.00" />
      <Card title="Return Total" cpt="66,777.00" jhp="66,777.00" />
    </div>
  );
};

export default CPTCards;
