export default function getManufacturingAndLogistics(
  offer_id,
  manufacturingData
) {
  let totalDays = 0;
  if (manufacturingData?.length > 0) {
    //Checking whether given offer_id has individual record in data?
    const found = manufacturingData?.find((e) => e?.offer_id === offer_id);
    if (found) {
      totalDays =
        found?.manufacturingTime +
        found?.shippingToFba +
        found?.shippingToPrepCenter;
    } else {
      //If given offer_id not has individual record then here checking whether there is a record exist which has applyToAll true, if it has then that will be applied to this offer, otherwise totalDays remains zero(0)
      const hasApplyToAllTrue = manufacturingData?.find(
        (obj) => obj.applyToAll === true
      );
      if (hasApplyToAllTrue) {
        totalDays =
          hasApplyToAllTrue?.manufacturingTime +
          hasApplyToAllTrue?.shippingToFba +
          hasApplyToAllTrue?.shippingToPrepCenter;
      }
    }
  }
  return totalDays;
}
