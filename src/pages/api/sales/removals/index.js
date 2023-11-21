import getAllSales from "@/utils/getAllSales";
import getAllSalesNew from "@/utils/getAllSalesNew";

export default async function handler(req, res) {
  const { apiKey } = req.body;
  try {
    const API_TOKEN = apiKey;
    const data = await getAllSalesNew(null, null, API_TOKEN, false);
    const filtered = data?.filter(
      (sale) =>
        sale?.sale_status?.includes("Cancel") ||
        sale?.sale_status?.includes("Return")
    );
    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
