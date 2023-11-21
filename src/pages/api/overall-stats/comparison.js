import expensesApi from "@/lib/expense";
import userApi from "@/lib/user";
import calculatePercentageChange from "@/utils/calculatePercentageChange";
import getAllSales from "@/utils/getAllSales";
import getAllSalesByProduct from "@/utils/getAllSalesByProduct";
import getAllSalesNew from "@/utils/getAllSalesNew";
import axios from "axios";
import dayjs from "dayjs";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  try {
    let previousStartDate;
    let previousEndDate;

    switch (body?.duration) {
      case "Today":
        previousStartDate = dayjs(body?.startDate).subtract(1, "day").toDate();
        previousEndDate = previousStartDate;
        break;
      case "Yesterday":
        previousStartDate = dayjs(body?.startDate).subtract(1, "day").toDate();
        previousEndDate = previousStartDate;
        break;
      case "Last Month":
        const lastMonthStart = dayjs(body?.startDate)
          .subtract(1, "month")
          .startOf("month");
        const lastMonthEnd = dayjs(body?.startDate)
          .subtract(1, "month")
          .endOf("month");
        previousStartDate = lastMonthStart.toDate();
        previousEndDate = lastMonthEnd.toDate();
        break;
      case "This Month":
        const thisMonthStart = dayjs(body?.startDate)
          .subtract(1, "month")
          .startOf("month");
        const thisMonthEnd = dayjs(body?.startDate)
          .subtract(1, "month")
          .endOf("month");
        previousStartDate = thisMonthStart.toDate();
        previousEndDate = thisMonthEnd.toDate();
        break;
      case "This Year":
        const thisYearStart = dayjs(body?.startDate)
          .subtract(1, "year")
          .startOf("year");
        const thisYearEnd = dayjs(body?.startDate)
          .subtract(1, "year")
          .endOf("year");
        previousStartDate = thisYearStart.toDate();
        previousEndDate = thisYearEnd.toDate();
        break;
    }
    // console.log("previousStartDate", previousStartDate);
    // console.log("previousEndDate", previousEndDate);
    // const apiUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${dayjs(
    //   previousStartDate
    // ).format("YYYY-MM-DD")};end_date:${dayjs(previousEndDate).format(
    //   "YYYY-MM-DD"
    // )}`;
    const API_TOKEN = body?.apiKey;
    // const response = await fetch(apiUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const data = await response.json();
    // let sales = data?.sales;
    // let totalPages = Math.ceil(data.page_summary?.total / 100);
    // if (body?.duration === "This Month" || body?.duration === "Last Month") {
    //   for (let i = 2; i <= totalPages; i++) {
    //     // console.log("i", i);
    //     const res = await axios.get(
    //       `https://seller-api.takealot.com/v2/sales?page_number=${i}&page_size=100&filters=start_date:${dayjs(
    //         previousStartDate
    //       ).format("YYYY-MM-DD")};end_date:${dayjs(previousEndDate).format(
    //         "YYYY-MM-DD"
    //       )}`,
    //       {
    //         headers: {
    //           Accept: "application/json",
    //           Authorization: `Key ${API_TOKEN}`,
    //         },
    //       }
    //     );
    //     // console.log("page_summary in get sales", res.data?.sales?.length);

    //     sales = sales.concat(res.data.sales);
    //   }
    // }
    // console.log("sales", data);
    if (body?.marketplace === "All market places") {
      const userApis = await userApi.getActiveUserAPIKeys(body?.uid);
      let previousTotalRevenue = 0;
      let previousTakealotFee = 0;
      let previousUnitSold = 0;
      let previousTotalExpenses = 0;
      let previousReturnTotal = 0;
      let previousReturnCost = 0;
      for (let it = 0; it < userApis?.length; it++) {
        if (body?.productTitle === "") {
          let sales = [];
          if (body?.duration === "This Year") {
            const first6MonthsStart = new Date(new Date().getFullYear(), 0, 1);
            const first6MonthsEnd = new Date(new Date().getFullYear(), 5, 30);

            const second6MonthsStart = new Date(new Date().getFullYear(), 6, 1);
            const second6MonthsEnd = new Date(new Date().getFullYear(), 11, 31);
            let first6MonthsSales = await getAllSalesNew(
              dayjs(first6MonthsStart).format("YYYY-MM-DD"),
              dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
              userApis[it]?.apiKey
            );
            let second6MonthsSales = await getAllSalesNew(
              dayjs(second6MonthsStart).format("YYYY-MM-DD"),
              dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
              userApis[it]?.apiKey
            );

            sales = first6MonthsSales?.concat(second6MonthsSales);
          } else {
            sales = await getAllSalesNew(
              dayjs(previousStartDate).format("YYYY-MM-DD"),
              dayjs(previousEndDate).format("YYYY-MM-DD"),
              userApis[it]?.apiKey
            );
          }

          // console.log("sale.length", sales?.length);

          sales?.forEach((e) => {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              previousTotalRevenue += e?.selling_price;
              previousUnitSold += e?.quantity;
            }
            previousTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              previousReturnTotal += e?.quantity;
              previousReturnCost += e?.selling_price;
            }
          });

          const expenses = await expensesApi.getExpensesByDateRange({
            start: dayjs(body?.startDate).format("DD MMM YYYY"),
            end: dayjs(body?.endDate).format("DD MMM YYYY"),
          });
          expenses?.forEach((expense) => {
            previousTotalExpenses = previousTotalExpenses + expense?.amount;
          });
        } else {
          let sales = [];
          if (body?.duration === "This Year") {
            const first6MonthsStart = new Date(new Date().getFullYear(), 0, 1);
            const first6MonthsEnd = new Date(new Date().getFullYear(), 5, 30);

            const second6MonthsStart = new Date(new Date().getFullYear(), 6, 1);
            const second6MonthsEnd = new Date(new Date().getFullYear(), 11, 31);

            let first6MonthsSales = await getAllSalesByProduct(
              dayjs(first6MonthsStart).format("YYYY-MM-DD"),
              dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
              userApis[it]?.apiKey,
              true,
              body?.productTitle
            );
            let second6MonthsSales = await getAllSalesByProduct(
              dayjs(second6MonthsStart).format("YYYY-MM-DD"),
              dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
              userApis[it]?.apiKey,
              true,
              body?.productTitle
            );

            sales = first6MonthsSales?.concat(second6MonthsSales);
          } else {
            sales = await getAllSalesByProduct(
              dayjs(previousStartDate).format("YYYY-MM-DD"),
              dayjs(previousEndDate).format("YYYY-MM-DD"),
              userApis[it]?.apiKey,
              true,
              body?.productTitle
            );
          }
          // let previousTotalRevenue = 0;
          // let previousTakealotFee = 0;
          // let previousUnitSold = 0;
          // let previousTotalExpenses = 0;
          // let previousReturnTotal = 0;
          // let previousReturnCost = 0;
          // console.log("sale.length", sales?.length);

          sales?.forEach((e) => {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              previousTotalRevenue += e?.selling_price;
              previousUnitSold += e?.quantity;
            }
            previousTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              previousReturnTotal += e?.quantity;
              previousReturnCost += e?.selling_price;
            }
          });

          const expenses = await expensesApi.getExpensesByDateRange({
            start: dayjs(body?.startDate).format("DD MMM YYYY"),
            end: dayjs(body?.endDate).format("DD MMM YYYY"),
          });
          expenses?.forEach((expense) => {
            previousTotalExpenses = previousTotalExpenses + expense?.amount;
          });

          // const revenueChange = calculatePercentageChange(
          //   body?.data?.totalRevenue,
          //   previousTotalRevenue
          // );
          // const takealotFeeChange = calculatePercentageChange(
          //   body?.data?.takealotFee,
          //   previousTakealotFee
          // );
          // const totalExpensesChange = calculatePercentageChange(
          //   body?.data?.totalExpenses,
          //   previousTotalExpenses
          // );
          // const unitSoldChange = calculatePercentageChange(
          //   body?.data?.unitSold,
          //   previousUnitSold
          // );
          // const returnTotalChange = calculatePercentageChange(
          //   body?.data?.returnTotal,
          //   previousReturnTotal
          // );
          // const returnCostChange = calculatePercentageChange(
          //   body?.data?.returnCost,
          //   previousReturnCost
          // );

          // res.status(200).json({
          //   revenueChange,
          //   takealotFeeChange,
          //   totalExpensesChange,
          //   unitSoldChange,
          //   returnTotalChange,
          //   returnCostChange,
          //   previousTotalRevenue,
          //   previousTakealotFee,
          //   previousUnitSold,
          //   previousTotalExpenses,
          //   previousReturnTotal,
          //   previousReturnCost,
          // });
        }
      }

      const revenueChange = calculatePercentageChange(
        body?.data?.totalRevenue,
        previousTotalRevenue
      );
      const takealotFeeChange = calculatePercentageChange(
        body?.data?.takealotFee,
        previousTakealotFee
      );
      const totalExpensesChange = calculatePercentageChange(
        body?.data?.totalExpenses,
        previousTotalExpenses
      );
      const unitSoldChange = calculatePercentageChange(
        body?.data?.unitSold,
        previousUnitSold
      );
      const returnTotalChange = calculatePercentageChange(
        body?.data?.returnTotal,
        previousReturnTotal
      );
      const returnCostChange = calculatePercentageChange(
        body?.data?.returnCost,
        previousReturnCost
      );

      res.status(200).json({
        revenueChange,
        takealotFeeChange,
        totalExpensesChange,
        unitSoldChange,
        returnTotalChange,
        returnCostChange,
        previousTotalRevenue,
        previousTakealotFee,
        previousUnitSold,
        previousTotalExpenses,
        previousReturnTotal,
        previousReturnCost,
      });
    } else {
      if (body?.productTitle === "") {
        let sales = [];
        if (body?.duration === "This Year") {
          const first6MonthsStart = new Date(new Date().getFullYear(), 0, 1);
          const first6MonthsEnd = new Date(new Date().getFullYear(), 5, 30);

          const second6MonthsStart = new Date(new Date().getFullYear(), 6, 1);
          const second6MonthsEnd = new Date(new Date().getFullYear(), 11, 31);
          let first6MonthsSales = await getAllSalesNew(
            dayjs(first6MonthsStart).format("YYYY-MM-DD"),
            dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
            body?.marketplace
          );
          let second6MonthsSales = await getAllSalesNew(
            dayjs(second6MonthsStart).format("YYYY-MM-DD"),
            dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
            body?.marketplace
          );

          sales = first6MonthsSales?.concat(second6MonthsSales);
        } else {
          sales = await getAllSalesNew(
            dayjs(previousStartDate).format("YYYY-MM-DD"),
            dayjs(previousEndDate).format("YYYY-MM-DD"),
            body?.marketplace
          );
        }
        let previousTotalRevenue = 0;
        let previousTakealotFee = 0;
        let previousUnitSold = 0;
        let previousTotalExpenses = 0;
        let previousReturnTotal = 0;
        let previousReturnCost = 0;
        // console.log("sale.length", sales?.length);

        sales?.forEach((e) => {
          if (
            e?.sale_status !== "Cancelled by Customer" &&
            e?.sale_status !== "Cancelled by Takealot"
          ) {
            previousTotalRevenue += e?.selling_price;
            previousUnitSold += e?.quantity;
          }
          previousTakealotFee += e?.total_fee;
          if (e?.sale_status === "Returned") {
            previousReturnTotal += e?.quantity;
            previousReturnCost += e?.selling_price;
          }
        });

        const expenses = await expensesApi.getExpensesByDateRange({
          start: dayjs(body?.startDate).format("DD MMM YYYY"),
          end: dayjs(body?.endDate).format("DD MMM YYYY"),
        });
        expenses?.forEach((expense) => {
          previousTotalExpenses = previousTotalExpenses + expense?.amount;
        });

        const revenueChange = calculatePercentageChange(
          body?.data?.totalRevenue,
          previousTotalRevenue
        );
        const takealotFeeChange = calculatePercentageChange(
          body?.data?.takealotFee,
          previousTakealotFee
        );
        const totalExpensesChange = calculatePercentageChange(
          body?.data?.totalExpenses,
          previousTotalExpenses
        );
        const unitSoldChange = calculatePercentageChange(
          body?.data?.unitSold,
          previousUnitSold
        );
        const returnTotalChange = calculatePercentageChange(
          body?.data?.returnTotal,
          previousReturnTotal
        );
        const returnCostChange = calculatePercentageChange(
          body?.data?.returnCost,
          previousReturnCost
        );

        res.status(200).json({
          revenueChange,
          takealotFeeChange,
          totalExpensesChange,
          unitSoldChange,
          returnTotalChange,
          returnCostChange,
          previousTotalRevenue,
          previousTakealotFee,
          previousUnitSold,
          previousTotalExpenses,
          previousReturnTotal,
          previousReturnCost,
        });
      } else {
        let sales = [];
        if (body?.duration === "This Year") {
          const first6MonthsStart = new Date(new Date().getFullYear(), 0, 1);
          const first6MonthsEnd = new Date(new Date().getFullYear(), 5, 30);

          const second6MonthsStart = new Date(new Date().getFullYear(), 6, 1);
          const second6MonthsEnd = new Date(new Date().getFullYear(), 11, 31);

          let first6MonthsSales = await getAllSalesByProduct(
            dayjs(first6MonthsStart).format("YYYY-MM-DD"),
            dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
            body?.marketplace,
            true,
            body?.productTitle
          );
          let second6MonthsSales = await getAllSalesByProduct(
            dayjs(second6MonthsStart).format("YYYY-MM-DD"),
            dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
            body?.marketplace,
            true,
            body?.productTitle
          );

          sales = first6MonthsSales?.concat(second6MonthsSales);
        } else {
          sales = await getAllSalesByProduct(
            dayjs(previousStartDate).format("YYYY-MM-DD"),
            dayjs(previousEndDate).format("YYYY-MM-DD"),
            body?.marketplace,
            true,
            body?.productTitle
          );
        }
        let previousTotalRevenue = 0;
        let previousTakealotFee = 0;
        let previousUnitSold = 0;
        let previousTotalExpenses = 0;
        let previousReturnTotal = 0;
        let previousReturnCost = 0;
        // console.log("sale.length", sales?.length);

        sales?.forEach((e) => {
          if (
            e?.sale_status !== "Cancelled by Customer" &&
            e?.sale_status !== "Cancelled by Takealot"
          ) {
            previousTotalRevenue += e?.selling_price;
            previousUnitSold += e?.quantity;
          }
          previousTakealotFee += e?.total_fee;
          if (e?.sale_status === "Returned") {
            previousReturnTotal +=e?.quantity;
            previousReturnCost += e?.selling_price;
          }
        });

        const expenses = await expensesApi.getExpensesByDateRange({
          start: dayjs(body?.startDate).format("DD MMM YYYY"),
          end: dayjs(body?.endDate).format("DD MMM YYYY"),
        });
        expenses?.forEach((expense) => {
          previousTotalExpenses = previousTotalExpenses + expense?.amount;
        });

        const revenueChange = calculatePercentageChange(
          body?.data?.totalRevenue,
          previousTotalRevenue
        );
        const takealotFeeChange = calculatePercentageChange(
          body?.data?.takealotFee,
          previousTakealotFee
        );
        const totalExpensesChange = calculatePercentageChange(
          body?.data?.totalExpenses,
          previousTotalExpenses
        );
        const unitSoldChange = calculatePercentageChange(
          body?.data?.unitSold,
          previousUnitSold
        );
        const returnTotalChange = calculatePercentageChange(
          body?.data?.returnTotal,
          previousReturnTotal
        );
        const returnCostChange = calculatePercentageChange(
          body?.data?.returnCost,
          previousReturnCost
        );

        res.status(200).json({
          revenueChange,
          takealotFeeChange,
          totalExpensesChange,
          unitSoldChange,
          returnTotalChange,
          returnCostChange,
          previousTotalRevenue,
          previousTakealotFee,
          previousUnitSold,
          previousTotalExpenses,
          previousReturnTotal,
          previousReturnCost,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
