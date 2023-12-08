import getAllSales from "@/utils/getAllSales";
import getAllSalesByProduct from "@/utils/getAllSalesByProduct";
import getAllSalesNew from "@/utils/getAllSalesNew";
import getTransactionsByType from "@/utils/getTransactionsByType";
import groupSales from "@/utils/groupSalesByMonths";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const body = req.body;
  console.log("pl data", body);
  try {
    let rangeSales;
    let groupedSales;
    let transactions = [];

    if (body?.duration === "Last 12 Months") {
      const first6MonthsStart = body?.dates[0];
      const first6MonthsEnd = dayjs(body?.dates[0])
        .add(6, "month")
        .endOf("month");
      const second6MonthsStart = dayjs(body?.dates[0])
        .add(7, "month")
        .startOf("month");
      const second6MonthsEnd = body?.dates[1];
      if (body?.productTitle === "") {
        let first6MonthsSales = await getAllSalesNew(
          dayjs(first6MonthsStart).format("YYYY-MM-DD"),
          dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
          body?.apiKey
        );
        let second6MonthsSales = await getAllSalesNew(
          dayjs(second6MonthsStart).format("YYYY-MM-DD"),
          dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
          body?.apiKey
        );
        let first6MonthsTransactions = await getTransactionsByType(
          dayjs(first6MonthsStart).format("YYYY-MM-DD"),
          dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
          body?.apiKey
        );
        let second6MonthsTransactions = await getTransactionsByType(
          dayjs(second6MonthsStart).format("YYYY-MM-DD"),
          dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
          body?.apiKey
        );

        rangeSales = first6MonthsSales?.concat(second6MonthsSales);
        transactions = first6MonthsTransactions?.concat(
          second6MonthsTransactions
        );
        console.log("ranges sales length", rangeSales?.length);
      } else {
        let first6MonthsSales = await getAllSalesByProduct(
          dayjs(first6MonthsStart).format("YYYY-MM-DD"),
          dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
          body?.apiKey,
          true,
          body?.productTitle
        );
        let second6MonthsSales = await getAllSalesByProduct(
          dayjs(second6MonthsStart).format("YYYY-MM-DD"),
          dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
          body?.apiKey,
          true,
          body?.productTitle
        );

        rangeSales = first6MonthsSales?.concat(second6MonthsSales);
      }
      // res.status(200).json(groupedSales);
    } else {
      if (body?.productTitle === "") {
        rangeSales = await getAllSalesNew(
          dayjs(body?.dates[0]).format("YYYY-MM-DD"),
          dayjs(body?.dates[1]).format("YYYY-MM-DD"),
          body?.apiKey
        );
        transactions = await getTransactionsByType(
          dayjs(body?.dates[0]).format("YYYY-MM-DD"),
          dayjs(body?.dates[1]).format("YYYY-MM-DD"),
          body?.apiKey
        );
        console.log("ranges sales length", rangeSales?.length);
      } else {
        rangeSales = await getAllSalesByProduct(
          dayjs(body?.dates[0]).format("YYYY-MM-DD"),
          dayjs(body?.dates[1]).format("YYYY-MM-DD"),
          body?.apiKey,
          true,
          body?.productTitle
        );
      }
    }

    if (body?.duration === "Last 12 Months") {
      groupedSales = await groupSales.groupSalesByMonths(
        rangeSales,
        transactions
      );
    } else if (body?.duration === "Last 3 Months") {
      groupedSales = await groupSales.groupSalesByWeeks(
        rangeSales,
        transactions
      );
    } else if (body?.duration === "Last 30 Days") {
      groupedSales = await groupSales.groupSalesByLast30Days(
        rangeSales,
        transactions
      );
    }
    //     else {
    //       const startDate = dayjs(body?.dates[0]);
    //       const endDate = dayjs(body?.dates[1]);
    //       const dateDiffInDays = endDate.diff(startDate, "days");
    //       console.log("dateDiffInDays", dateDiffInDays);
    //       let groupingType = "days";
    //       if (dateDiffInDays > 92) {
    //         groupingType = "months";
    //       } else if (dateDiffInDays > 30) {
    //         groupingType = "weeks";
    //       }
    // if(groupingType === "months"){
    //   groupedSales = await groupSales.groupSalesByMonths(rangeSales);
    // }else if(groupingType === "weeks"){

    // }

    //     }

    res.status(200).json(groupedSales);
  } catch (error) {
    console.error("Error in profit/loss:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error?.message,
    });
  }
}
