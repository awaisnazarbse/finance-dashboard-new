import dayjs from "dayjs";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  // console.log("calling api", body);

  try {
    const startDate = dayjs()
      .subtract(5, "months")
      .startOf("month")
      .format("YYYY-MM-DD");
    const endDate = dayjs().format("YYYY-MM-DD");
    const apiUrl = `https://seller-api.takealot.com/v1/seller/transactions?date_from=${startDate}&date_to=${endDate}&page_size=50&page_number=${body?.page}`;
    const API_TOKEN = body?.apiKey;
    // const API_TOKEN =
    //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    const data = await response.json();
    const last72hours = {
      startDate: dayjs(),
      endDate: dayjs().subtract(72, "hours"),
    };
    let pendingBalance = 0;
    data?.transactions?.map((e) => {
      if (
        dayjs(e?.date).isAfter(last72hours?.startDate) ||
        dayjs(e?.date).isSame(last72hours.startDate) ||
        dayjs(e?.date).isBefore(last72hours.endDate) ||
        dayjs(e?.date).isSame(last72hours.endDate)
      ) {
        if (e?.transaction_type?.description === "Customer Order Payment") {
          pendingBalance += Number(e?.inc_vat);
        }
      }
    });
    // console.log("data", data);
    // console.log("calling api", response);
    res.status(200).json({ data, pendingBalance });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
