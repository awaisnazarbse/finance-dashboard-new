import axios from "axios";

export default async function getAllSalesNew(
  startDate,
  endDate,
  API_TOKEN,
  range = true
) {
  const maxRetries = 5;
  const retryDelay = 1000;
  const pageSize = 100;
  let allSales = [];
  let pageNumber = 1;

  const totalPages = await getTotalPages(startDate, endDate, API_TOKEN, range);
  if (totalPages === 0) {
    return allSales;
  }

  const fetchPage = async (pageNumber) => {
    try {
      const response = await fetchSalesData(
        pageNumber,
        startDate,
        endDate,
        API_TOKEN,
        range
      );
      return response?.sales || [];
    } catch (error) {
      if (maxRetries > 0 && error.response && error.response.status === 429) {
        console.log(
          `Rate limited. Retrying in ${retryDelay / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return fetchPage(pageNumber);
      } else {
        throw error;
      }
    }
  };

  const promises = Array.from({ length: totalPages }, (_, i) =>
    fetchPage(pageNumber + i)
  );
  const pageResults = await Promise.all(promises);

  return pageResults.flat();
}

async function getTotalPages(startDate, endDate, API_TOKEN, range) {
  const response = await fetchSalesData(
    1,
    startDate,
    endDate,
    API_TOKEN,
    range
  );
  return Math.ceil(response?.page_summary?.total / 100) || 0;
}

async function fetchSalesData(
  pageNumber,
  startDate,
  endDate,
  API_TOKEN,
  range
) {
  let url = `https://seller-api.takealot.com/v2/sales?page_number=${pageNumber}&page_size=100`;
  if (range) {
    url += `&filters=start_date:${startDate},end_date:${endDate}`;
  }

  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Key ${API_TOKEN}`,
    },
  });

  return response.data;
}
