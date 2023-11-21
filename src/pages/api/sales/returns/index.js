import userApi from "@/lib/user";
import getAllSalesReturned from "@/utils/getAllSalesReturned";
import axios from "axios";

export default async function handler(req, res) {
  const body = req.body;
  try {
    let data = [];
    if (body?.marketplace === "All market places") {
      const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
      for (let it = 0; it < userApiKeys?.length; it++) {
        const response = await axios.get(
          `https://seller-api.takealot.com/v1/returns`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Key ${userApiKeys[it]?.apiKey}`,
            },
          }
        );
        data = data?.concat(response?.data?.items);
      }
    } else {
      const response = await axios.get(
        `https://seller-api.takealot.com/v1/returns`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Key ${body?.marketplace}`,
          },
        }
      );
      data = response.data?.items
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching returned sales from the API.",
      error: error.message,
    });
  }
}
