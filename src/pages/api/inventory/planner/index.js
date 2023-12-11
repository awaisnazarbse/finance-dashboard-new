import purchasedOrdersApi from "@/lib/purchasedOrders";
import getAllOffers from "@/utils/getAllOffers";
import getAllSalesByProduct from "@/utils/getAllSalesByProduct";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const { apiKey } = req.body;
  try {
    // const purchaseOrders = await purchasedOrdersApi.getPurchasedOrderByStatus(
    //   "Ordered"
    // );
    const offers = await getAllOffers(apiKey);
    const offerIds = offers.map((offer) => offer?.title);

    const last30DaysStart = dayjs().subtract(30, "days").format("YYYY-MM-DD");
    const last30DaysEnd = dayjs().format("YYYY-MM-DD");

    // Fetch sales data for all offers in parallel
    const salesPromises = offerIds.map((offerId) =>
      getAllSalesByProduct(
        last30DaysStart,
        last30DaysEnd,
        apiKey,
        true,
        offerId
      )
    );

    const salesResults = await Promise.all(salesPromises);

    // Prepare the final offers array
    const finalOffers = offerIds.map((offerId, index) => {
      const sales = salesResults[index];
      const itemsSoldLast30Days = sales.reduce(
        (total, sale) => total + (sale?.quantity || 0),
        0
      );
      return {
        ...offers.find((offer) => offer.title === offerId),
        itemsSoldLast30Days,
      };
    });

    res.status(200).json(finalOffers);

    // const purchaseOrders = await purchasedOrdersApi.getPurchasedOrderByStatus(
    //   "Ordered"
    // );
    // const offers = await getAllOffers(apiKey);
    // const offerIds = offers.map((offer) => offer?.title);

    // const last30DaysStart = dayjs().subtract(30, "days").format("YYYY-MM-DD");
    // const last30DaysEnd = dayjs().format("YYYY-MM-DD");

    // // Fetch sales data for all offers in parallel
    // const salesPromises = offerIds.map((offerId) =>
    //   getAllSalesByProduct(
    //     last30DaysStart,
    //     last30DaysEnd,
    //     apiKey,
    //     true,
    //     offerId
    //   )
    // );

    // const salesResults = await Promise.all(salesPromises);

    // // Prepare the final offers array
    // const finalOffers = offerIds.map((offerId, index) => {
    //   const sales = salesResults[index];
    //   const itemsSoldLast30Days = sales.reduce(
    //     (total, sale) => total + (sale?.quantity || 0),
    //     0
    //   );

    //   // Calculate unitsOrdered for each product based on purchaseOrders
    //   const productUnitsOrdered = calculateProductUnitsOrdered(
    //     purchaseOrders,
    //     offerId
    //   );

    //   return {
    //     ...offers.find((offer) => offer.title === offerId),
    //     itemsSoldLast30Days,
    //     productUnitsOrdered,
    //   };
    // });

    // res.status(200).json(finalOffers);
  } catch (error) {
    console.error("[Error: /api/inventory/planner] ", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error?.message,
    });
  }
}

// Function to calculate unitsOrdered for each product
function calculateProductUnitsOrdered(purchaseOrders, offerId) {
  const productUnitsOrdered = new Map();
  purchaseOrders.forEach((order) => {
    order.products.forEach((product) => {
      if (product?.product?.title === offerId) {
        const title = product?.product;
        const unitsOrdered = Number(product?.unitsOrdered);
        if (productUnitsOrdered.has(title)) {
          productUnitsOrdered.set(
            title,
            productUnitsOrdered.get(title) + unitsOrdered
          );
        } else {
          productUnitsOrdered.set(title, unitsOrdered);
        }
      }
    });
  });
  return Array.from(productUnitsOrdered, ([title, unitsOrdered]) => ({
    title,
    unitsOrdered,
  }));
}
