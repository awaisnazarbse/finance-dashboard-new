import expensesApi from "@/lib/expense";
import offersApi from "@/lib/offers";
import dayjs from "dayjs";
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

async function groupSalesByMonths(salesArray, transactions) {
  // const groupedSales = {};

  // // Iterate through each sale
  // for (const sale of salesArray) {
  //   const orderDate = dayjs(sale.order_date);
  //   const monthTitle = orderDate.format("MMM YYYY"); // Format the month as "Aug 2023"

  //   // Create the month entry if it doesn't exist
  //   if (!groupedSales[monthTitle]) {
  //     groupedSales[monthTitle] = {
  //       title: monthTitle,
  //       sales: [],
  //     };
  //   }

  //   // Add the sale to the respective month's sales array
  //   groupedSales[monthTitle].sales.push(sale);
  // }

  // // Convert the groupedSales object into an array of objects
  // return Object.values(groupedSales);

  // const todayExpenses = await expensesApi.getExpensesByDateRange({
  //   start: dayjs(body?.dates[0]).format("DD/MM/YY"),
  //   end: dayjs(body?.dates[1]).format("DD/MM/YY"),
  // });

  // // Create an object to store sales data for each month
  // const groupedSales = {};

  // // Get the current date
  // const currentDate = dayjs();

  // // Iterate over the last 12 months
  // for (let i = 0; i < 12; i++) {
  //   const monthDate = currentDate.subtract(i, "month");
  //   const startDate = monthDate.startOf("month");
  //   const endDate = monthDate.endOf("month");
  //   console.log("start date", dayjs(startDate).format("DD/MM/YY"));
  //   console.log("end date", dayjs(endDate).format("DD/MM/YY"));
  //   const expenses = await expensesApi.getExpensesByDateRange({
  //     start: dayjs(startDate).format("DD/MM/YY"),
  //     end: dayjs(endDate).format("DD/MM/YY"),
  //   });
  //   console.log("expenses", expenses?.length);

  //   let totalExpenses = 0;
  //   expenses?.forEach((expense) => {
  //     totalExpenses += expense?.amount;
  //   });

  //   // Generate a key in the format "Mon YYYY" (e.g., "Sep 2023")
  //   const monthKey = monthDate.format("MMM YYYY");

  //   // Initialize the sales array for this month
  //   groupedSales[monthKey] = {
  //     sales: 0,
  //     units: 0,
  //     fee: 0,
  //     grossProfit: 0,
  //     expenses: totalExpenses,
  //     netProfit: 0,
  //     margin: 0,
  //     roi: 0,
  //   };
  // }

  // // Iterate over sales data and add them to the corresponding month
  // salesArray.forEach((sale) => {
  //   const saleDate = dayjs(sale.order_date);
  //   const monthKey = saleDate.format("MMM YYYY");

  //   if (groupedSales.hasOwnProperty(monthKey)) {
  //     groupedSales[monthKey].sales += sale?.selling_price;
  //     groupedSales[monthKey].units += sale?.quantity;
  //     groupedSales[monthKey].fee += sale?.total_fee;
  //   }
  // });

  // // Create an array of objects with month titles and sales data
  // const result = Object.entries(groupedSales).map(([month, data]) => {
  //   const grossProfit = data?.sales - data?.fee;
  //   const netProfit = grossProfit - data?.expenses;
  //   const margin = (netProfit / data?.sales) * 100;
  //   // return {
  //   //   parameter: "Sales",
  //   //   [month]: data?.sales,
  //   // };
  //   return {
  //     title: month,
  //     sales: data?.sales,
  //     units: data?.units,
  //     fee: data?.fee,
  //     expenses: data?.expenses,
  //     grossProfit,
  //     margin,
  //     netProfit,
  //   };
  // });

  // return result;

  const parameters = [
    "Sales",
    "Units Sold",
    "Returns",
    "Return Cost",
    "Promo",
    "Estimated Payout",
    "Cost of Goods",
    "Takealot Fee",
    "Success Fee",
    "Courier Collection Fee",
    "AutoIbt Fee",
    "Fulfillment Fee",
    "Gross Profit",
    "Expenses",
    "Net Profit",
    "Margin",
    "ROI",
    "Ad Credit Purchase",
    "Subscription Fee Charge",
    "Storage Fee Charge",
    "Manual Reversal",
  ];
  const groupedData = {};

  const currentDate = dayjs();

  parameters.forEach((parameter) => {
    groupedData[parameter] = {};
    // Iterate over the last 12 months
    for (let i = 0; i < 12; i++) {
      const monthDate = currentDate.subtract(i, "month");
      const monthKey = monthDate.format("MMM YYYY");
      groupedData[parameter][monthKey] = 0;
      groupedData[parameter].parameter = parameter;
    }
  });

  // console.log("groupedData",groupedData);
  let cols = [];
  let cols1 = [];
  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.subtract(i, "month");
    const startDate = monthDate.startOf("month");
    const endDate = monthDate.endOf("month");
    // Filter sales based on the date range
    const filteredSales = salesArray.filter((sale) => {
      const saleDate = dayjs(sale?.order_date);
      return (
        (saleDate.isAfter(startDate) && saleDate.isBefore(endDate)) ||
        saleDate.isSame(startDate) ||
        saleDate.isSame(endDate)
      );
    });
    const filteredTransactions = transactions.filter((trans) => {
      const transactionDate = dayjs(trans?.date_created);
      return (
        (transactionDate.isAfter(startDate) &&
          transactionDate.isBefore(endDate)) ||
        transactionDate.isSame(startDate) ||
        transactionDate.isSame(endDate)
      );
    });

    // Extract unique offer IDs from the filtered sales
    const uniqueOfferIds = [
      ...new Set(filteredSales.map((sale) => sale.offer_id)),
    ];

    let cog = 0;
    if (uniqueOfferIds.length > 0) {
      if (uniqueOfferIds.length > 30) {
        const groupedOfferIds = [];
        for (let i = 0; i < uniqueOfferIds.length; i += 30) {
          groupedOfferIds.push(uniqueOfferIds.slice(i, i + 30));
        }
        await Promise.all(
          groupedOfferIds.map(async (e) => {
            cog += await offersApi.getOfferCOGsByOfferIds(e);
          })
        );
      } else {
        cog = await offersApi.getOfferCOGsByOfferIds(uniqueOfferIds);
      }
    }

    const expenses = await expensesApi.getExpensesByDateRange({
      start: dayjs(startDate).format("DD MMM YYYY"),
      end: dayjs(endDate).format("DD MMM YYYY"),
    });

    let totalExpenses = 0;
    expenses?.forEach((expense) => {
      totalExpenses += expense?.amount;
    });

    const monthKey = monthDate.format("MMM YYYY");
    // console.log("monthKey", monthKey);
    groupedData.Expenses[monthKey] = totalExpenses;
    groupedData["Cost of Goods"][monthKey] = cog;
    let adCreditFee = 0;
    let subscriptionFee = 0;
    let storageFee = 0;
    let manualReversalFee = 0;

    if (filteredTransactions?.length > 0) {
      filteredTransactions.forEach((e) => {
        if (e?.transaction_type?.description === "Ad Credit Purchase") {
          adCreditFee += Number(e?.inc_vat);
        } else if (
          e?.transaction_type?.description === "Subscription Fee Charge"
        ) {
          subscriptionFee += Number(e?.inc_vat);
        } else if (e?.transaction_type?.description === "Storage Fee Charge") {
          storageFee += Number(e?.inc_vat);
        } else if (e?.transaction_type?.description === "Manual Reversal") {
          manualReversalFee += Number(e?.inc_vat);
        }
      });
    }

    groupedData["Ad Credit Purchase"][monthKey] = adCreditFee;
    groupedData["Subscription Fee Charge"][monthKey] = subscriptionFee;
    groupedData["Storage Fee Charge"][monthKey] = storageFee;
    groupedData["Manual Reversal"][monthKey] = manualReversalFee;

    cols1.push({
      title: monthKey,
      start: dayjs(startDate).format("YYYY-MM-DD"),
      end: dayjs(endDate).format("YYYY-MM-DD"),
    });
    cols.push(monthKey);
  }

  // console.log("group data with cog", groupedData);

  salesArray.forEach((sale) => {
    const saleDate = dayjs(sale.order_date);
    const monthKey = saleDate.format("MMM YYYY");

    parameters.forEach(async (parameter) => {
      if (parameter === "Expenses") return;

      if (groupedData[parameter].hasOwnProperty(monthKey)) {
        if (parameter === "Sales") {
          if (
            sale?.sale_status !== "Cancelled by Customer" &&
            sale?.sale_status !== "Cancelled by Takealot" &&
            sale?.sale_status !== "Cancelled by Seller" &&
            sale?.sale_status !== "Cancelled - Late Delivery" &&
            sale?.sale_status !== "Cancelled - Inbound Exception"
          ) {
            groupedData[parameter][monthKey] += sale?.selling_price;
          }
        }
        if (parameter === "Units Sold") {
          if (
            sale?.sale_status !== "Cancelled by Customer" &&
            sale?.sale_status !== "Cancelled by Takealot" &&
            sale?.sale_status !== "Cancelled by Seller" &&
            sale?.sale_status !== "Cancelled - Late Delivery" &&
            sale?.sale_status !== "Cancelled - Inbound Exception"
          ) {
            groupedData[parameter][monthKey] += sale?.quantity;
          }
        }
        if (parameter === "Takealot Fee") {
          groupedData[parameter][monthKey] += sale?.total_fee;
        }
        if (parameter === "Success Fee") {
          groupedData[parameter][monthKey] += sale.success_fee;
        }
        if (parameter === "Courier Collection Fee") {
          groupedData[parameter][monthKey] += sale.courier_collection_fee;
        }
        if (parameter === "AutoIbt Fee") {
          groupedData[parameter][monthKey] += sale.auto_ibt_fee;
        }
        if (parameter === "Fulfillment Fee") {
          groupedData[parameter][monthKey] += sale.fulfillment_fee;
        }
        if (parameter === "Estimated Payout") {
          groupedData[parameter][monthKey] =
            groupedData["Sales"][monthKey] -
            groupedData["Takealot Fee"][monthKey];
        }

        if (parameter === "Gross Profit") {
          groupedData[parameter][monthKey] =
            groupedData["Sales"][monthKey] -
            groupedData["Takealot Fee"][monthKey] -
            groupedData["Return Cost"][monthKey];
        }

        // const netProfit = grossProfit - data?.expenses;
        //   const margin = (netProfit / data?.sales) * 100;

        if (parameter === "Net Profit") {
          groupedData[parameter][monthKey] =
            groupedData["Gross Profit"][monthKey] -
            groupedData["Expenses"][monthKey];
        }
        if (parameter === "Margin") {
          groupedData[parameter][monthKey] =
            (groupedData["Net Profit"][monthKey] /
              groupedData["Sales"][monthKey]) *
            100;
        }
        if (parameter === "ROI") {
          groupedData[parameter][monthKey] =
            (groupedData["Net Profit"][monthKey] /
              groupedData["Cost of Goods"][monthKey]) *
            100;
        }

        if (sale?.promotion && parameter === "Promo") {
          groupedData[parameter][monthKey] += sale?.quantity;
        }

        if (sale?.sale_status === "Returned" && parameter === "Returns") {
          groupedData[parameter][monthKey] += sale.quantity;
        }
        if (sale?.sale_status === "Returned" && parameter === "Return Cost") {
          groupedData[parameter][monthKey] +=
            sale.selling_price - sale?.total_fee;
        }
      }
    });
  });

  const result = parameters.map((parameter) => {
    if (
      parameter !== "Success Fee" &&
      parameter !== "Fulfillment Fee" &&
      parameter !== "AutoIbt Fee" &&
      parameter !== "Courier Collection Fee"
    ) {
      const parameterData = {
        parameter,
      };
      Object.entries(groupedData[parameter]).forEach(([month, value]) => {
        // console.log("month in last", month);
        // console.log("value in last", value);
        parameterData[month] = value;
      });

      if (parameter === "Takealot Fee") {
        parameterData.children = [
          { parameter: "Success Fee", ...groupedData["Success Fee"] },
          { parameter: "Fulfillment Fee", ...groupedData["Fulfillment Fee"] },
          { parameter: "AutoIbt Fee", ...groupedData["AutoIbt Fee"] },
          {
            parameter: "Courier Collection Fee",
            ...groupedData["Courier Collection Fee"],
          },
          { parameter: "Manual Reversal", ...groupedData["Manual Reversal"] },
        ];
      }

      return parameterData;
    }
  });

  return {
    result: result?.filter((value) => value !== undefined),
    cols: cols1,
  };
}

async function groupSalesByWeeks(salesArray) {
  const parameters = [
    "Sales",
    "Units Sold",
    "Returns",
    "Return Cost",
    "Promo",
    "Estimated Payout",
    "Cost of Goods",
    "Takealot Fee",
    "Success Fee",
    "Courier Collection Fee",
    "AutoIbt Fee",
    "Fulfillment Fee",
    "Gross Profit",
    "Expenses",
    "Net Profit",
    "Margin",
    "ROI",
  ];

  const thisYearWeeks = generateWeeks();
  console.log("thisYearWeeks", thisYearWeeks);

  const last12Weeks = getLast12Weeks();

  // Calculate the start and end date for the last 3 months
  const currentDate = dayjs();
  const last3MonthsStartDate = currentDate
    .subtract(2, "month")
    .startOf("month")
    .add(1, "day");
  const last3MonthsEndDate = currentDate;
  // console.log("last3MonthsStartDate",last3MonthsStartDate)
  // console.log("last3MonthsEndDate",last3MonthsEndDate)
  let weekNumber = 1;
  // Create a map to store the weekly data
  const groupedData = {};
  const cols = [];
  const cols1 = [];

  // Iterate over the last 12 weeks
  let currentWeekStart = last3MonthsStartDate.clone().startOf("week");
  // while (currentWeekStart.isBefore(last3MonthsEndDate)) {
  //   const weekKey = `WK${weekStart.diff(last3MonthsStartDate, "weeks")}`;

  //   parameters.forEach((parameter) => {
  //     if (!groupedData[parameter]) {
  //       groupedData[parameter] = {};
  //     }
  //     if (!groupedData[parameter][weekKey]) {
  //       groupedData[parameter][weekKey] =
  //         parameter === "Refund" ||
  //         parameter === "Promo" ||
  //         parameter === "Estimated Payout" ||
  //         parameter === "Cost of Goods" ||
  //         parameter === "ROI"
  //           ? "-"
  //           : 0;
  //     }
  //   });

  //   cols.push(weekKey);
  //   weekNumber++;

  //   currentWeekStart = currentWeekStart.add(1, "week");
  // }

  // Calculate expenses for each week
  // const saleDate = dayjs(salesArray[0]?.order_date, "DD MMM YYYY hh:mm:ss");
  // const weekStart = dayjs(thisYearWeeks[0]?.start, "YYYY-MM-DD");
  // const weekEnd = dayjs(thisYearWeeks[0]?.end, "YYYY-MM-DD");
  // console.log("sale date", saleDate);
  // console.log("week start", weekStart);
  // console.log("week end", weekEnd);
  // console.log(
  //   "lie in week",
  //   (weekStart.isAfter(saleDate) && weekEnd.isBefore(saleDate)) ||
  //     weekStart.isSame(saleDate) ||
  //     weekEnd.isSame(saleDate)
  // );

  thisYearWeeks.forEach(async (e) => {
    const weekKey = e?.title;
    const weekStart = dayjs(e?.start, "YYYY-MM-DD");
    const weekEnd = dayjs(e?.end, "YYYY-MM-DD");
    parameters.forEach((parameter) => {
      if (!groupedData[parameter]) {
        groupedData[parameter] = {};
      }
      if (!groupedData[parameter][weekKey]) {
        groupedData[parameter][weekKey] = 0;
      }
    });
    // Filter sales based on the date range
    const filteredSales = salesArray.filter((sale) => {
      const saleDate = dayjs(sale?.order_date, "DD MMM YYYY hh:mm:ss");
      return (
        (saleDate.isAfter(weekStart) && saleDate.isBefore(weekEnd)) ||
        saleDate.isSame(weekStart) ||
        saleDate.isSame(weekEnd)
      );
    });

    // Extract unique offer IDs from the filtered sales
    const uniqueOfferIds = [
      ...new Set(filteredSales.map((sale) => sale.offer_id)),
    ];

    let cog = 0;
    if (uniqueOfferIds.length > 0) {
      if (uniqueOfferIds.length > 30) {
        const groupedOfferIds = [];
        for (let i = 0; i < uniqueOfferIds.length; i += 30) {
          groupedOfferIds.push(uniqueOfferIds.slice(i, i + 30));
        }
        await Promise.all(
          groupedOfferIds.map(async (e) => {
            cog += await offersApi.getOfferCOGsByOfferIds(e);
          })
        );
      } else {
        cog = await offersApi.getOfferCOGsByOfferIds(uniqueOfferIds);
      }
    }

    console.log("uniqueOfferIds", uniqueOfferIds);
    groupedData["Cost of Goods"][weekKey] = cog;

    cols1.push(e);
    cols.push(weekKey);
  });

  const today = dayjs();
  const threeMonthsAgo = today.subtract(3, "month");

  const expenses = await expensesApi.getExpensesByDateRange({
    start: threeMonthsAgo.format("DD MMM YYYY"),
    end: today.format("DD MMM YYYY"),
  });
  let weekNumberExpenses = 1;
  expenses.forEach((expense) => {
    const expenseDate = dayjs(expense.date);
    const weekStart = expenseDate.startOf("week");
    const weekKey = `WK${weekNumberExpenses}`;
    weekNumberExpenses++;

    groupedData.Expenses[weekKey] += expense.amount;
  });
  let weekNumber1 = 1;
  // Calculate sales data for each sale within the last 3 months
  salesArray.forEach((sale) => {
    const saleDate = dayjs(sale?.order_date, "DD MMM YYYY hh:mm:ss");
    const week = thisYearWeeks?.find(
      (week) =>
        (saleDate.isAfter(dayjs(week?.start, "YYYY-MM-DD")) &&
          saleDate.isBefore(dayjs(week?.end, "YYYY-MM-DD"))) ||
        saleDate.isSame(dayjs(week?.start, "YYYY-MM-DD")) ||
        saleDate.isSame(dayjs(week?.end, "YYYY-MM-DD"))
    );
    if (week) {
      const weekKey = week?.title;

      parameters.forEach((parameter) => {
        if (parameter === "Expenses") return;
        if (groupedData[parameter][weekKey] !== undefined) {
          if (parameter === "Sales") {
            if (
              sale?.sale_status !== "Cancelled by Customer" &&
            sale?.sale_status !== "Cancelled by Takealot" &&
            sale?.sale_status !== "Cancelled by Seller" &&
            sale?.sale_status !== "Cancelled - Late Delivery" &&
            sale?.sale_status !== "Cancelled - Inbound Exception"
            ) {
              groupedData[parameter][weekKey] += sale.selling_price;
            }
          }
          if (parameter === "Units Sold") {
            if (
              sale?.sale_status !== "Cancelled by Customer" &&
            sale?.sale_status !== "Cancelled by Takealot" &&
            sale?.sale_status !== "Cancelled by Seller" &&
            sale?.sale_status !== "Cancelled - Late Delivery" &&
            sale?.sale_status !== "Cancelled - Inbound Exception"
            ) {
              groupedData[parameter][weekKey] += sale.quantity;
            }
          }
          if (parameter === "Takealot Fee") {
            groupedData[parameter][weekKey] += sale.total_fee;
          }
          if (parameter === "Success Fee") {
            groupedData[parameter][weekKey] += sale.success_fee;
          }
          if (parameter === "Courier Collection Fee") {
            groupedData[parameter][weekKey] += sale.courier_collection_fee;
          }
          if (parameter === "AutoIbt Fee") {
            groupedData[parameter][weekKey] += sale.auto_ibt_fee;
          }
          if (parameter === "Fulfillment Fee") {
            groupedData[parameter][weekKey] += sale.fulfillment_fee;
          }
          if (parameter === "Gross Profit") {
            groupedData[parameter][weekKey] =
              groupedData["Sales"][weekKey] -
              groupedData["Takealot Fee"][weekKey] -
              groupedData["Return Cost"][weekKey];
          }
          if (parameter === "Net Profit") {
            groupedData[parameter][weekKey] =
              groupedData["Gross Profit"][weekKey] -
              groupedData["Expenses"][weekKey];
          }
          if (parameter === "Estimated Payout") {
            groupedData[parameter][weekKey] =
              groupedData["Sales"][weekKey] -
              groupedData["Takealot Fee"][weekKey];
          }
          if (parameter === "Margin") {
            groupedData[parameter][weekKey] =
              (groupedData["Net Profit"][weekKey] /
                groupedData["Sales"][weekKey]) *
              100;
          }
          if (parameter === "ROI") {
            groupedData[parameter][weekKey] =
              (groupedData["Net Profit"][weekKey] /
                groupedData["Cost of Goods"][weekKey]) *
              100;
          }

          if (sale?.promotion && parameter === "Promo") {
            groupedData[parameter][weekKey] += sale.quantity;
          }

          if (sale?.sale_status === "Returned" && parameter === "Returns") {
            groupedData[parameter][weekKey] += sale.quantity;
          }
          if (sale?.sale_status === "Returned" && parameter === "Return Cost") {
            groupedData[parameter][weekKey] +=
              sale.selling_price - sale?.total_fee;
          }
        }
      });
      weekNumber1++;
    }
  });

  // Create the result array
  // const result = parameters.map((parameter) => {
  //   const parameterData = { parameter };
  //   cols.forEach((weekKey) => {
  //     parameterData[weekKey] = groupedData[parameter][weekKey];
  //   });
  //   return parameterData;
  // });
  // const result = parameters.map((parameter) => {
  //   const parameterData = { parameter };
  //   cols.forEach((weekKey) => {
  //     parameterData[weekKey] = groupedData[parameter][weekKey];
  //   });

  //   // Check if the parameter is "Takealot Fee"
  //   if (parameter === "Takealot Fee") {
  //     // Add a children array or any other modifications you need
  //     parameterData.children = []; // You can initialize it as an empty array or with some default values
  //   }

  //   return parameterData;
  // });

  const result = parameters.map((parameter) => {
    if (
      parameter !== "Success Fee" &&
      parameter !== "Fulfillment Fee" &&
      parameter !== "AutoIbt Fee" &&
      parameter !== "Courier Collection Fee"
    ) {
      const parameterData = { parameter };
      cols.forEach((weekKey) => {
        parameterData[weekKey] = groupedData[parameter][weekKey];
      });

      if (parameter === "Takealot Fee") {
        parameterData.children = [
          { parameter: "Success Fee", ...groupedData["Success Fee"] },
          { parameter: "Fulfillment Fee", ...groupedData["Fulfillment Fee"] },
          { parameter: "AutoIbt Fee", ...groupedData["AutoIbt Fee"] },
          {
            parameter: "Courier Collection Fee",
            ...groupedData["Courier Collection Fee"],
          },
        ];
      }

      return parameterData;
    }
  });

  console.log("data...", result);

  return {
    result: result?.filter((value) => value !== undefined),
    cols: cols1.reverse(),
  };
}

async function groupSalesByLast30Days(salesArray) {
  const parameters = [
    "Sales",
    "Units Sold",
    "Returns",
    "Return Cost",
    "Promo",
    "Estimated Payout",
    "Cost of Goods",
    "Takealot Fee",
    "Success Fee",
    "Courier Collection Fee",
    "AutoIbt Fee",
    "Fulfillment Fee",
    "Gross Profit",
    "Expenses",
    "Net Profit",
    "Margin",
    "ROI",
  ];

  // Calculate the start and end date for the last 30 days
  const currentDate = dayjs();
  const last30DaysStartDate = currentDate.subtract(29, "day").startOf("day");
  const last30DaysEndDate = currentDate.endOf("day");

  // Create a map to store the daily data
  const groupedData = {};
  const cols = [];
  const cols1 = [];

  // Iterate over the last 30 days
  let currentDay = last30DaysStartDate.clone();
  while (currentDay.isBefore(last30DaysEndDate)) {
    const dayKey = currentDay.format("YYYY-MM-DD");
    cols1.push({ title: dayKey, start: dayKey, end: dayKey });
    parameters.forEach((parameter) => {
      if (!groupedData[parameter]) {
        groupedData[parameter] = {};
      }
      if (!groupedData[parameter][dayKey]) {
        groupedData[parameter][dayKey] = 0;
      }
    });

    // Filter sales based on the date range
    const filteredSales = salesArray?.filter((sale, i) => {
      const saleDate = dayjs(sale?.order_date, "DD MMM YYYY");
      // if (i === 1) {
      //   console.log("sale date", saleDate);
      //   console.log("sale?.order_date", sale?.order_date);
      // }
      return saleDate.isSame(dayjs(currentDay, "DD MMM YYYY"));
    });

    // Extract unique offer IDs from the filtered sales
    const uniqueOfferIds = [
      ...new Set(filteredSales.map((sale) => sale.offer_id)),
    ];

    let cog = 0;

    if (uniqueOfferIds?.length > 0) {
      if (uniqueOfferIds.length > 30) {
        const groupedOfferIds = [];
        for (let i = 0; i < uniqueOfferIds.length; i += 30) {
          groupedOfferIds.push(uniqueOfferIds.slice(i, i + 30));
        }
        await Promise.all(
          groupedOfferIds.map(async (e) => {
            cog += await offersApi.getOfferCOGsByOfferIds(e);
          })
        );
      } else {
        cog = await offersApi.getOfferCOGsByOfferIds(uniqueOfferIds);
      }
    }

    groupedData["Cost of Goods"][dayKey] = cog;

    cols.push(dayKey);

    currentDay = currentDay.add(1, "day");
  }

  // Calculate sales data for each sale within the last 30 days
  salesArray.forEach((sale) => {
    const saleDate = dayjs(sale.order_date);
    if (
      saleDate.isAfter(last30DaysStartDate) &&
      saleDate.isBefore(last30DaysEndDate)
    ) {
      const dayKey = saleDate.format("YYYY-MM-DD");

      parameters.forEach((parameter) => {
        if (parameter === "Expenses") return;
        if (groupedData[parameter][dayKey] !== undefined) {
          if (parameter === "Sales") {
            if (
              sale?.sale_status !== "Cancelled by Customer" &&
              sale?.sale_status !== "Cancelled by Takealot" &&
              sale?.sale_status !== "Cancelled by Seller" &&
              sale?.sale_status !== "Cancelled - Late Delivery" &&
              sale?.sale_status !== "Cancelled - Inbound Exception"
            ) {
              groupedData[parameter][dayKey] += sale.selling_price;
            }
          }
          if (parameter === "Units Sold") {
            if (
              sale?.sale_status !== "Cancelled by Customer" &&
            sale?.sale_status !== "Cancelled by Takealot" &&
            sale?.sale_status !== "Cancelled by Seller" &&
            sale?.sale_status !== "Cancelled - Late Delivery" &&
            sale?.sale_status !== "Cancelled - Inbound Exception"
            ) {
              groupedData[parameter][dayKey] += sale.quantity;
            }
          }
          if (parameter === "Takealot Fee") {
            groupedData[parameter][dayKey] += sale.total_fee;
          }
          if (parameter === "Success Fee") {
            groupedData[parameter][dayKey] += sale.success_fee;
          }
          if (parameter === "Courier Collection Fee") {
            groupedData[parameter][dayKey] += sale.courier_collection_fee;
          }
          if (parameter === "AutoIbt Fee") {
            groupedData[parameter][dayKey] += sale.auto_ibt_fee;
          }
          if (parameter === "Fulfillment Fee") {
            groupedData[parameter][dayKey] += sale.fulfillment_fee;
          }
          if (parameter === "Gross Profit") {
            groupedData[parameter][dayKey] =
              groupedData["Sales"][dayKey] -
              groupedData["Takealot Fee"][dayKey] -
              groupedData["Return Cost"][dayKey];
          }
          if (parameter === "Net Profit") {
            groupedData[parameter][dayKey] =
              groupedData["Gross Profit"][dayKey] -
              groupedData["Expenses"][dayKey];
          }
          if (parameter === "Margin") {
            groupedData[parameter][dayKey] =
              (groupedData["Net Profit"][dayKey] /
                groupedData["Sales"][dayKey]) *
              100;
          }
          if (parameter === "ROI") {
            groupedData[parameter][dayKey] =
              (groupedData["Net Profit"][dayKey] /
                groupedData["Cost of Goods"][dayKey]) *
              100;
          }
          if (parameter === "Estimated Payout") {
            groupedData[parameter][dayKey] =
              groupedData["Sales"][dayKey] -
              groupedData["Takealot Fee"][dayKey];
          }

          if (sale?.promotion && parameter === "Promo") {
            groupedData[parameter][dayKey] += sale.quantity;
          }

          if (sale?.sale_status === "Returned" && parameter === "Returns") {
            groupedData[parameter][dayKey] += sale.quantity;
          }
          if (sale?.sale_status === "Returned" && parameter === "Return Cost") {
            groupedData[parameter][dayKey] +=
              sale.selling_price - sale?.total_fee;
          }
        }
      });
    }
  });

  // // Create the result array
  // const result = parameters.map((parameter) => {
  //   const parameterData = { parameter };
  //   cols.forEach((dayKey) => {
  //     parameterData[dayKey] = groupedData[parameter][dayKey];
  //   });
  //   return parameterData;
  // });

  // return { result, cols: cols1.reverse() };

  const result = parameters.map((parameter) => {
    if (
      parameter !== "Success Fee" &&
      parameter !== "Fulfillment Fee" &&
      parameter !== "AutoIbt Fee" &&
      parameter !== "Courier Collection Fee"
    ) {
      const parameterData = { parameter };
      cols.forEach((dayKey) => {
        parameterData[dayKey] = groupedData[parameter][dayKey];
      });

      if (parameter === "Takealot Fee") {
        parameterData.children = [
          { parameter: "Success Fee", ...groupedData["Success Fee"] },
          { parameter: "Fulfillment Fee", ...groupedData["Fulfillment Fee"] },
          { parameter: "AutoIbt Fee", ...groupedData["AutoIbt Fee"] },
          {
            parameter: "Courier Collection Fee",
            ...groupedData["Courier Collection Fee"],
          },
        ];
      }

      return parameterData;
    }
  });

  console.log("data...", result);

  return {
    result: result?.filter((value) => value !== undefined),
    cols: cols1.reverse(),
  };
}

const groupSales = {
  groupSalesByMonths,
  groupSalesByWeeks,
  groupSalesByLast30Days,
};

export default groupSales;

const getLast12Weeks = () => {
  const weeks = [];

  for (let i = 11; i >= 0; i--) {
    const startOfWeek = dayjs().subtract(i, "week").startOf("week");
    const endOfWeek = dayjs().subtract(i, "week").endOf("week");

    const weekData = {
      weekKey: `WK${i + 1}`,
      start: startOfWeek.format("D MMM, YYYY"),
      end: endOfWeek.format("D MMM, YYYY"),
    };

    weeks.push(weekData);
  }

  return weeks;
};

const generateWeeks = () => {
  const currentYear = dayjs().year();
  const startDate = dayjs(`${currentYear}-01-01`);
  const endDate = dayjs(`${currentYear}-12-31`);

  const weeks = [];
  let currentWeekStart = startDate.startOf("week");

  while (currentWeekStart.isBefore(endDate)) {
    const currentWeekEnd = currentWeekStart.endOf("week");
    const weekNumber = currentWeekStart.week(); // Use week() instead of isoWeek()

    weeks.push({
      start: currentWeekStart.format("YYYY-MM-DD"),
      end: currentWeekEnd.format("YYYY-MM-DD"),
      title: `WK${weekNumber}`,
    });

    currentWeekStart = currentWeekEnd.add(1, "day");
  }

  // Filter weeks for the last 3 months
  const today = dayjs();
  const threeMonthsAgo = today.subtract(3, "month");
  const filteredWeeks = weeks.filter(
    (week) =>
      dayjs(week.start).isAfter(threeMonthsAgo) &&
      dayjs(week.end).isBefore(today)
  );

  return filteredWeeks;
};
