import getAllOffers from "@/utils/getAllOffers";

export default async function handler(req, res) {
  const { apiKey } = req.body;
  try {
    let stockInHand = 0;
    let stockInDC = 0;
    let stockOnWay = 0;
    const offers = await getAllOffers(apiKey);
    for (let i = 0; i < offers.length; i++) {
      let inHand = 0;
      let inHandStockValue = 0;
      offers[i]?.leadtime_stock?.forEach(
        (e) => (inHand += e?.quantity_available)
      );
      inHandStockValue = inHand * offers[i]?.selling_price;

      stockInHand += inHandStockValue;
      stockInDC +=
        offers[i]?.stock_at_takealot_total * offers[i]?.selling_price;
      stockOnWay += offers[i]?.total_stock_on_way * offers[i]?.selling_price;
    }

    res.status(200).json({ stockInHand, stockInDC, stockOnWay });
  } catch (error) {
    console.error("[Error: /api/inventory/planner/metrics] ", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error?.message,
    });
  }
}
