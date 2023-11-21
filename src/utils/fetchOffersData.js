import axios from "axios";

export default async function fetchOffersData(pageNumber, API_TOKEN) {
  const maxRetries = 5;
  const retryDelay = 5000;
  try {
    const response = await axios.get(
      `https://seller-api.takealot.com/v2/offers?page_number=${pageNumber}&page_size=100`,
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
      console.log(`Rate limited. Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return fetchOffersData(pageNumber, API_TOKEN);
    } else {
      throw error;
    }
  }
}
