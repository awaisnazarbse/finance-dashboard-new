export default async function calculateUnitsOrderedByOfferId(
  offerId,
  purchaseOrders
) {
  let totalUnitsOrdered = 0;
  purchaseOrders?.forEach((order) => {
    order?.products?.forEach((product) => {
      if (product?.product?.offer_id === offerId) {
        totalUnitsOrdered += Number(product.unitsOrdered);
      }
    });
  });
  return totalUnitsOrdered;
}
