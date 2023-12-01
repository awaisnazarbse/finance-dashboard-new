import axios from "axios";

export default async function handler(req, res) {
  const body = req.body;

  try {
    const apiUrl = `https://seller-api.takealot.com/v1/seller/balances`;
    const API_TOKEN = body?.apiKey;
    //  "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    const data = await response.data;
    res.status(200).json(data?.balances);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error,
    });
  }
}
