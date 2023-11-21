import axios from "axios";

export default async function fetchReturnedSalesData(pageNumber, API_TOKEN) {
  const maxRetries = 5;
  const retryDelay = 1000;
  try {
    const response = await axios.get(
      `https://seller-api.takealot.com/v1/returns?page_number=${pageNumber}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && maxRetries > 0) {
      console.log(
        `Rate limited [fetchReturnedSalesData]. Retrying in ${
          retryDelay / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return fetchReturnedSalesData(pageNumber, API_TOKEN);
    } else {
      throw error;
    }
  }
}
