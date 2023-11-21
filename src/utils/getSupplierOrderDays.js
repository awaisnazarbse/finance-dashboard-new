export default function getSupplierOrderDays(offer_id, data) {
  let totalDays = 0;
  if (data?.length > 0) {
    const found = data?.find((e) => e?.offer_id === offer_id);
    if (found) {
      totalDays = found?.daysAfterNewOrder + found?.buffer;
    } else {
      const hasApplyToAllTrue = data?.find((obj) => obj.applyToAll === true);
      if (hasApplyToAllTrue) {
        totalDays =
          hasApplyToAllTrue?.daysAfterNewOrder + hasApplyToAllTrue?.buffer;
      }
    }
  }
  return totalDays;
}
