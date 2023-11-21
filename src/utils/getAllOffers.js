import fetchOffersData from "./fetchOffersData";

export default async function getAllOffers(API_TOKEN) {
  // console.log("data in get all", { startDate, endDate, API_TOKEN });
  const maxRetries = 5;
  const retryDelay = 1000;
  let allOffers = [];
  let pageNumber = 1;
  while (true) {
    let totalPages;
    const offers = await fetchOffersData(pageNumber, API_TOKEN);

    if (!offers || offers.length === 0) {
      break;
    }

    const data = offers?.offers?.filter(
      (e) => e?.status !== "Disabled by Seller"
    );

    allOffers = allOffers.concat(data);
    pageNumber++;
    totalPages = Math.ceil(offers?.total_results / 100);
    if (pageNumber > totalPages || maxRetries === 0) {
      break;
    }
  }

  return allOffers;
}
