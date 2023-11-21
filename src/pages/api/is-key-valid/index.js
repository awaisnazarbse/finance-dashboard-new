import offersApi from "@/lib/offers";
import extractPLIDFromURL from "@/utils/extractPLIDFromUrl";
import getAllOffers from "@/utils/getAllOffers";
import axios from "axios";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { apiKey } = req.body;
  try {
    const response = await axios.get(
      "https://seller-api.takealot.com/v1/seller",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${apiKey}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching data from the API.",
        message: error,
      });
  }
}
