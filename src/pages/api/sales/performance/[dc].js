import fetch from "node-fetch";

export default async function handler(req, res) {
  const query = req.query;
  const { dc } = query;
  const body = JSON.parse(req.body);
  try {
    const apiUrl = `https://seller-api.takealot.com/v2/sales?filters=dc:${dc}`;
    const API_TOKEN = body?.apiKey;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    const sales = await response.json();
    let totalRevenue = 0;
    let takealotFee = 0;
    let unitSold = 0;
    sales?.sales?.forEach((e) => {
      if (e?.sale_status === "Shipped to Customer") {
        totalRevenue = totalRevenue + e?.selling_price;
        takealotFee = takealotFee + e?.total_fee;
        unitSold = unitSold + e?.quantity;
      }
    });
    const earning = totalRevenue - takealotFee;
    const rev = [totalRevenue, takealotFee, earning, unitSold];
    res.status(200).json(rev);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
