export default function calculateUnitsOrderedForProduct(
  productTitle,
  purchaseOrders
) {
  let totalUnitsOrdered = 0;
  purchaseOrders?.forEach((order) => {
    order?.products?.forEach((product) => {
      if (product?.product?.title === productTitle) {
        totalUnitsOrdered += Number(product.unitsOrdered);
      }
    });
  });
  return totalUnitsOrdered;
}
