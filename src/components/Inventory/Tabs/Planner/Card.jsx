import TextSkeletonSingle from "@/components/utils/TextSkeletonSingle";
import CardRow from "./CardRow";

const Card = ({ data, bg, title, loading }) => {
  return (
    <div className="flex flex-col shadow-lg bg-white rounded-lg">
      <div className="p-4 rounded-t-lg" style={{ background: bg }}>
        <span className="text-black text-sm font-medium">{title}</span>
      </div>
      {/* <div className="hidden sm:flex flex-col space-y-4 p-4">
        <CardRow
          data={[
            {
              title: "FBA/FBM Stock",
              value: "$4,445.00",
            },
            {
              title: "Reserved",
              value: "$0.00",
            },
            {
              title: "Sent to FBA",
              value: "$0.00",
            },
          ]}
          key={1}
        />
        <CardRow
          data={[
            {
              title: "Prep.Stock",
              value: "$4,445.00",
            },
            {
              title: "Ordered",
              value: "$6,89.00",
            },
            {
              title: "Total",
              value: "$9,999.00",
            },
          ]}
          key={2}
        />
        </div> */}
      <div className="flex flex-col space-y-4 p-4">
        {loading ? (
          <TextSkeletonSingle />
        ) : (
          <CardRow
            data={[
              {
                title: "Stock",
                value: `R ${Number(data?.stock)?.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
              {
                title: "Reserved",
                value: `R ${Number(data?.reserved)?.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
              {
                title: "Ordered",
                value: `R ${Number(data?.ordered)?.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
              {
                title: "Total",
                value: `R ${Number(
                  data?.stock + data?.reserved + data?.ordered
                )?.toLocaleString("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
            ]}
            key={1}
          />
        )}

        {/* <CardRow
          data={[
            {
              title: "Ordered",
              value: "$6,89.00",
            },
            {
              title: "Total",
              value: "$9,999.00",
            },
          ]}
          key={2}
        /> */}
      </div>
    </div>
  );
};

export default Card;
