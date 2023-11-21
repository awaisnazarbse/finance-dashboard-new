import fetchSalesData from "./fetchSalesData";

export default async function getAllSales(
  startDate,
  endDate,
  API_TOKEN,
  range = true
) {
  // console.log("data in get all", { startDate, endDate, API_TOKEN });
  const maxRetries = 5;
  const retryDelay = 1000;
  let allSales = [];
  let pageNumber = 1;
  while (true) {
    let totalPages;
    const sales = await fetchSalesData(
      pageNumber,
      startDate,
      endDate,
      API_TOKEN,
      range
    );

    if (!sales || sales.length === 0) {
      break;
    }

    allSales = allSales.concat(sales?.sales);
    pageNumber++;
    totalPages = Math.ceil(sales?.page_summary?.total / 100);
    if (pageNumber > totalPages || maxRetries === 0) {
      break;
    }
  }

  return allSales;
}
