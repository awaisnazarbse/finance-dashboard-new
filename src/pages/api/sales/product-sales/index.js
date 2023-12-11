import axios from "axios";

export default async function handler(req, res) {
  const data = req.body;
  try {
    const res = await axios.post(
      `https://api.sellermetrics.co.za/sales/products_sales`,
      {
        apiKey: data?.apiKey,
        startDate: data?.startDate,
        endDate: data?.endDate,
        duration: data?.duration,
        productTitle: data?.productTitle,
        marketplace: data?.marketplace,
        userApiKeys: data?.userApiKeys,
        uid: data?.uid,
      }
    );
    res.status(200).json(res.data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
