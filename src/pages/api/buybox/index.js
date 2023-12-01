import extractPLIDFromURL from "@/utils/extractPLIDFromUrl";

export default async function handler(req, res) {
  const body = req.body;

  try {
    const apiUrl = "https://seller-api.takealot.com/v2/offers?page_size=100";
    const API_TOKEN =
      "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    const data = await response.json();

    const filteredOffers = data?.offers?.filter((e) => e?.status === "Buyable");
    // console.log("data", data);
    let buyBoxProducts = [];
    await Promise.all(
      filteredOffers?.map(async (offer) => {
        const plid = extractPLIDFromURL(offer?.offer_url);
        const productRes = await fetch(
          `https://api.takealot.com/rest/v-1-10-0/product-details/${plid}?platform=desktop`
        );
        const product = await productRes.json();
        buyBoxProducts.push({ ...product, image: offer?.image_url });
      })
    );
    res.status(200).json(buyBoxProducts);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
