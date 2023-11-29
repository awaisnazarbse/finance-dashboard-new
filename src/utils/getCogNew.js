import offersApi from "@/lib/offers";

export default async function getCogNew(offerIds) {
  let cog = [];
  if (offerIds?.length > 0) {
    if (offerIds.length > 30) {
      const groupedOfferIds = [];
      for (let i = 0; i < offerIds.length; i += 30) {
        groupedOfferIds.push(offerIds?.slice(i, i + 30));
      }
      await Promise.all(
        groupedOfferIds.map(async (e) => {
          const newCogs = await offersApi.getOfferCogsByOfferIds(e);
          cog = cog.concat(newCogs)
        })
      );
    } else {
      cog = await offersApi.getOfferCogsByOfferIds(offerIds);
    }
  }
  return cog;
}
