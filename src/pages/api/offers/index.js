import offersApi from "@/lib/offers";
import extractPLIDFromURL from "@/utils/extractPLIDFromUrl";
import getAllOffers from "@/utils/getAllOffers";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  console.log("body in offers", body)
  try {
    const API_TOKEN = body?.apiKey;
    if (!API_TOKEN) {
      return res.status(400).json({ error: "API key is missing" });
    }
    const data = await getAllOffers(API_TOKEN);
    if (!data || data.length === 0) {
      return res.status(200).json([]);
    }

    const finalOffers = await Promise.all(
      data.map(async (offer) => {
        if (offer.status?.includes("Disable")) {
          return offer;
        }

        const plid = extractPLIDFromURL(offer.offer_url);
        const productRes = await fetch(
          `https://api.takealot.com/rest/v-1-10-0/product-details/${plid}?platform=desktop`
        );
        if (!productRes.ok) {
          // Handle fetch error here if needed
          return offer;
        }

        const product = await productRes.json();
        return {
          ...offer,
          ...product,
          selling_price: offer?.selling_price,
          rrp: offer?.rrp,
        };
      })
    );

    // Fetch COG for each offer in parallel
    const offersWithCOG = await Promise.all(
      finalOffers.map(async (offer) => {
        const cog = await offersApi.getOfferCOGWithType(offer?.offer_id);
        return { ...offer, ...cog };
      })
    );
    res.status(200).json(offersWithCOG);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
