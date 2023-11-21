import getAllOffers from "@/utils/getAllOffers";

export default async function handler(req, res) {
  const { apiKey } = req.body;
  try {
    const offers = await getAllOffers(apiKey);
    res.status(200).json(offers);
  } catch (error) {
    console.error("[Error: /api/offers/lite] ", error.message);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching data from the API.",
        message: error?.message,
      });
  }
}
