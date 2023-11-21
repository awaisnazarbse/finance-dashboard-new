import axios from "axios";

export default async function fetchSalesData(
  pageNumber,
  startDate,
  endDate,
  API_TOKEN,
  range
) {
  const maxRetries = 5;
  const retryDelay = 1000;
  try {
    let response = null;
    if (range) {
      response = await axios.get(
        `https://seller-api.takealot.com/v2/sales?page_number=${pageNumber}&page_size=100&filters=start_date:${startDate},end_date:${endDate}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Key ${API_TOKEN}`,
          },
        }
      );
    } else {
      response = await axios.get(
        `https://seller-api.takealot.com/v2/sales?page_number=${pageNumber}&page_size=100`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Key ${API_TOKEN}`,
          },
        }
      );
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && maxRetries > 0) {
      console.log(`Rate limited. Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return fetchSalesData(pageNumber, startDate, endDate, API_TOKEN, range);
    } else {
      throw error;
    }
  }
}
