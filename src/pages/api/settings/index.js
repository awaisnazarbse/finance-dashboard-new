import userApi from "@/lib/user";
import axios from "axios";
import fetch from "node-fetch";

export default async function handler(req, res) {
  // const body = JSON.parse(req.body);
  // console.log("calling api", body);

  const { uid } = req?.body;

  try {
    const apiKeys = await userApi.getUserAPIKeys(uid);
    console.log("apikeys", apiKeys);
    const API_URL = "https://seller-api.takealot.com/v1/seller";
    // const API_TOKEN =
    //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    // const API_TOKEN =
    //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    let usersAPIs = [];
    for (let i = 0; i < apiKeys.length; i++) {
      const response = await axios.get(API_URL, {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${apiKeys[i]?.apiKey}`,
        },
      });
      usersAPIs.push({
        ...response.data,
        apiKey: apiKeys[i]?.apiKey,
        active: apiKeys[i]?.active,
        fbId: apiKeys[i]?.id,
      });
    }

    res.status(200).json(usersAPIs);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
