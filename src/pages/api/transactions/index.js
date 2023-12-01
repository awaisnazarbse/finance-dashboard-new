import generateYearWeeks from "@/utils/generateYearWeeks";
import getAllTransactions from "@/utils/getAllTransactions";
import getDateRangeFormatted from "@/utils/getDateRangeFormatted";
import axios from "axios";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  try {
    const { startDate, endDate } = getDateRangeFormatted(
      body?.duration,
      body?.startDate,
      body?.endDate
    );
    console.log("date range", { startDate, endDate });
    const apiUrl = `https://seller-api.takealot.com/v1/seller/transactions?date_from=${startDate}&date_to=${endDate}&page_size=50&page_number=${body?.page}`;
    const disbursmentUrl = `https://seller-api.takealot.com/v1/seller/transactions?date_from=${startDate}&date_to=${endDate}&page_size=100&transaction_type_ids=8`;
    const API_TOKEN = body?.apiKey;
    // const API_TOKEN =
    //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    const disbursmentResponse = await axios.get(disbursmentUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });

    // console.log("response",response)
    const data = await response.data
    const disbursmentData = await disbursmentResponse.data
    const last3Days = {
      startDate: dayjs().subtract(3, "days").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    };
    const last72hours = {
      startDate: dayjs(),
      endDate: dayjs().subtract(72, "hours"),
    };
    let pendingBalance = 0;
    let disbursment = 0;
    const last72hoursTransactions = await getAllTransactions(
      last3Days.startDate,
      last3Days.endDate,
      API_TOKEN
    );
    last72hoursTransactions?.map((e) => {
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
    disbursmentData?.transactions?.forEach((e) => {
      disbursment += Number(e?.inc_vat);
    });
    const months =
      body?.duration === "Last Month"
        ? 1
        : body?.duration === "Last 3 Months"
        ? 3
        : body?.duration === "Last 6 Months"
        ? 6
        : 0;

    const weeks = generateYearWeeks(months, body?.duration);
    console.log("weeks", weeks);
    const groupedDisbursment = {};

    disbursmentData?.transactions?.forEach((transaction) => {
      const weekKey = getWeekKey(transaction.date_created, weeks);
      if (weekKey) {
        const amount = Number(transaction?.inc_vat);
        groupedDisbursment[weekKey] =
          (groupedDisbursment[weekKey] || 0) + amount;
      }
    });

    res
      .status(200)
      .json({ data, pendingBalance, disbursment, groupedDisbursment });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error,
    });
  }
}

// Function to get the week key for a given date
function getWeekKey(date, weeks) {
  const parsedDate = new Date(date);
  for (const week of weeks) {
    const startDate = new Date(week.start);
    const endDate = new Date(week.end);
    if (parsedDate >= startDate && parsedDate <= endDate) {
      return week.title;
    }
  }
  return null; // Week not found
}
