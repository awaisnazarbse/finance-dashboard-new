import { Tooltip } from "antd";
import StockItem from "./StockItem";
import calculateUnitsOrderedForProduct from "@/utils/calculateUnitsOrderedForProduct";
import getManufacturingAndLogistics from "@/utils/getManufacturingAndLogistics";

const ProductDetails = ({record, essentials}) => {
  let leadTimeStock = 0;
  record?.leadtime_stock?.forEach((e) => {
    leadTimeStock += e?.quantity_available;
  });
  const stockAtTakealot = record?.stock_at_takealot_total;
  const stockOnWay = record?.total_stock_on_way;
  const totalStock = leadTimeStock + stockAtTakealot + stockOnWay;
  const totalStockInHand = leadTimeStock + stockAtTakealot;

  const manufacturingAndLogisticsDays = getManufacturingAndLogistics(
    record?.offer_id,
    essentials?.manufacturingAndLogistics
  );

  let salesVelocity = Number(record?.itemsSoldLast30Days / 30).toFixed(1);
  let daysOfStockLeft = Math.floor(salesVelocity * totalStockInHand);
  let daysUntilNextOrder =
    manufacturingAndLogisticsDays === 0
      ? 0
      : Math.floor(manufacturingAndLogisticsDays - daysOfStockLeft);
  let stockValue = totalStockInHand * record?.selling_price;
  let ordered = calculateUnitsOrderedForProduct(
    record?.product,
    essentials?.purchaseOrders
  );
  let reserved = stockOnWay;

  return (
    <div className="flex items-center">
      <div className="flex flex-col space-y-2">
        <span className="text-[11px] text-black line-clamp-2">
          {record?.product}
        </span>
        <div className="flex items-center space-x-1">
          <span className="text-[12px] opacity-90">
            R {record?.selling_price}
          </span>
          <div className="w-1 h-1 rounded-full bg-gray-400 opacity-90"></div>
          <span className="text-[12px] opacity-90">COG R {record?.cog}</span>
          <div className="w-1 h-1 rounded-full bg-gray-400 opacity-90"></div>
          <Tooltip
            overlayInnerStyle={{
              width: "20rem",
              background: "black",
              padding: "1rem",
              borderRadius: "0px",
            }}
            arrow={false}
            overlayClassName="bg-opacity-50"
            title={
              <div className="flex flex-col space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <StockItem
                    title="Days of stock left"
                    value={daysOfStockLeft}
                  />
                  <StockItem
                    title="Days until next order"
                    value={daysUntilNextOrder}
                  />
                  <StockItem
                    title="Sales velocity (units/day)"
                    value={salesVelocity}
                  />
                </div>
                <hr className="opacity-60" />
                <div className="grid grid-cols-3 gap-3">
                  <StockItem
                    title="Stock value"
                    value={`R ${Number(stockValue)?.toLocaleString("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  />
                  <StockItem title="Ordered" value={ordered} />
                  <StockItem title="Reserved" value={reserved} />
                </div>
              </div>
            }
          >
            <span className="text-[12px] opacity-90">Stock: {totalStock}</span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
