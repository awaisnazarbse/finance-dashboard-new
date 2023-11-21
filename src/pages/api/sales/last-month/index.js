import fetch from "node-fetch";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const today = new Date();
  const firstDayLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  )
    .toISOString()
    .split("T")[0];
  const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    .toISOString()
    .split("T")[0];
  try {
    const apiUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${firstDayLastMonth},end_date:${lastDayLastMonth}`;
    const API_TOKEN = body?.apiKey;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    // console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
