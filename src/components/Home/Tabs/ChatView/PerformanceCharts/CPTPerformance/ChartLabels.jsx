import Label from "./Label";

const ChartLabels = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Label color="#FD9A8B" title="Total Revenue" />
      <Label color="#B7AEF8" title="Takealot Fee" />
      <Label color="#C1725A" title="Earning" />
      <Label color="#1569BD" title="Unit Sold" />
    </div>
  );
};

export default ChartLabels;
