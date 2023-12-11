import axios from "axios";

export default async function handler(req, res) {
  const query = req.query;
  const { id } = query;
  const { apiKey } = req.body;
  try {
    // https://seller-api.takealot.com/v1/shipments?shipment_state=3&get_instruction_data=true
    // https://seller-api.takealot.com/v1/shipment/2787527/shipment_items?get_po_data=true
    // https://seller-api.takealot.com/v2/shipment/facilities
    const API_URL = `https://seller-api.takealot.com/v1/shipment/${id}/shipment_items?get_po_data=true`;

    const response = await axios.get(API_URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Key ${apiKey}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error?.message,
    });
  }
}
