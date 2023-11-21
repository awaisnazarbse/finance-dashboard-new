import fetchProductSales from "./fetchProductSales";

export default async function getAllSalesByProduct(
  startDate,
  endDate,
  API_TOKEN,
  range = true,
  productTitle
) {
  // console.log("data in get all", { startDate, endDate, API_TOKEN });
  const maxRetries = 5;
  const retryDelay = 1000;
  let allSales = [];
  let pageNumber = 1;
  while (true) {
    let totalPages;
    const sales = await fetchProductSales(
      pageNumber,
      startDate,
      endDate,
      API_TOKEN,
      range,
      productTitle
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
