import fetch from "node-fetch";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  const apiUrl = "https://seller-api.takealot.com/v2/offers/offer";
  const API_TOKEN = data?.apiKey;
  try {
    data?.data?.map(async (e) => {
      const response = await fetch(`${apiUrl}/ID${e?.offer_id}`, {
        method: "PATCH",
        body: JSON.stringify(e),
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
    });
    // const response = await fetch(apiUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const data = await response.json();
    // // console.log("data", data);
    res.status(200).json({ isSuccess: true });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
