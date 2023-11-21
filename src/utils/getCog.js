import offersApi from "@/lib/offers";

export default async function getCog(offerIds) {
  let cog = 0;
  if (offerIds?.length > 0) {
    if (offerIds.length > 30) {
      const groupedOfferIds = [];
      for (let i = 0; i < offerIds.length; i += 30) {
        groupedOfferIds.push(offerIds?.slice(i, i + 30));
      }
      await Promise.all(
        groupedOfferIds.map(async (e) => {
          cog += await offersApi.getOfferCOGsByOfferIds(e);
        })
      );
    } else {
      cog = await offersApi.getOfferCOGsByOfferIds(offerIds);
    }
  }
  return cog;
}
