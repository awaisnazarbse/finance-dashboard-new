import fetch from "node-fetch";

export default async function handler(req, res) {
  const query = req.query;
  const { id } = query;
  const body = JSON.parse(req.body);

  try {
    const apiUrl = `https://seller-api.takealot.com/v2/offers/offer/${id}`;
    const API_TOKEN = body?.apiKey;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
