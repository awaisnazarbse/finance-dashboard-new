import userApi from "@/lib/user";
import getAllSales from "@/utils/getAllSales";
import getAllSalesNew from "@/utils/getAllSalesNew";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const { marketplace, uid, duration, startDate, endDate } = req.body;
  try {
    let data = [];
    if (marketplace === "All market places") {
      const userApiKeys = await userApi.getActiveUserAPIKeys(uid);
      for (let it = 0; it < userApiKeys?.length; it++) {
        const newSales = await getAllSalesNew(
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(endDate).format("YYYY-MM-DD"),
          userApiKeys[it]?.apiKey,
          true
        );
        data = data?.concat(newSales);
      }
    } else {
      data = await getAllSalesNew(
        dayjs(startDate).format("YYYY-MM-DD"),
        dayjs(endDate).format("YYYY-MM-DD"),
        marketplace,
        true
      );
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
