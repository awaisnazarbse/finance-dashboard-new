import axios from "axios";

export default async function handler(req, res) {
  const body = req.body;
  const query = req.query;
  const { id } = query;
  const API_TOKEN = body?.apiKey;
  try {
    await axios.patch(
      `https://seller-api.takealot.com/v2/offers/offer/ID${id}`,
      {
        selling_price: body?.data?.selling_price,
        rrp: body?.data?.rrp,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      }
    );
    res.status(200).json({ isSuccess: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "An error occurred while updating offer.",
      message: error,
    });
  }
}
