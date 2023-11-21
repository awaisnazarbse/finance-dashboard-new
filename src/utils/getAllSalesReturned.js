import fetchReturnedSalesData from "./fetchReturnedSalesData ";

export default async function getAllSalesReturned(API_TOKEN) {
  const maxRetries = 5;
  let allSales = [];
  let pageNumber = 1;
  while (true) {
    let totalPages;
    const sales = await fetchReturnedSalesData(pageNumber, API_TOKEN);

    if (!sales || sales.length === 0) {
      break;
    }

    console.log("sales return",sales);

    allSales = allSales.concat(sales?.sales);
    pageNumber++;
    totalPages = Math.ceil(sales?.page_summary?.total / 100);
    if (pageNumber > totalPages || maxRetries === 0) {
      break;
    }
  }

  return allSales;
}
