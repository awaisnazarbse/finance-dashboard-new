import expensesApi from "@/lib/expense";
import userApi from "@/lib/user";
import getAllSalesByProduct from "@/utils/getAllSalesByProduct";
import getAllSalesNew from "@/utils/getAllSalesNew";
import groupBy from "@/utils/groupBy";
import intervals from "@/utils/intervals";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const currentYear = new Date().getFullYear();
  const body = JSON.parse(req.body);
  // console.log("body.start", body?.startDate);
  // console.log("body.end", body?.endDate);
  // console.log("body.duration", body?.duration);
  // console.log("body.groupBy", body?.groupBy);
  try {
    const API_TOKEN = body?.apiKey;

    if (body?.productTitle === "") {
      // const jan = await getAllSales(
      //   `${currentYear}-01-01`,
      //   `${currentYear}-01-31`,
      //   API_TOKEN
      // );
      // const feb = await getAllSales(
      //   `${currentYear}-02-01`,
      //   `${currentYear}-02-28`,
      //   API_TOKEN
      // );
      // const mar = await getAllSales(
      //   `${currentYear}-03-01`,
      //   `${currentYear}-03-31`,
      //   API_TOKEN
      // );
      // const apr = await getAllSales(
      //   `${currentYear}-04-01`,
      //   `${currentYear}-04-30`,
      //   API_TOKEN
      // );
      // const may = await getAllSales(
      //   `${currentYear}-05-01`,
      //   `${currentYear}-05-31`,
      //   API_TOKEN
      // );
      // const jun = await getAllSales(
      //   `${currentYear}-06-01`,
      //   `${currentYear}-06-30`,
      //   API_TOKEN
      // );
      // const jul = await getAllSales(
      //   `${currentYear}-07-01`,
      //   `${currentYear}-07-31`,
      //   API_TOKEN
      // );
      // const aug = await getAllSales(
      //   `${currentYear}-08-01`,
      //   `${currentYear}-08-31`,
      //   API_TOKEN
      // );
      // const sep = await getAllSales(
      //   `${currentYear}-09-01`,
      //   `${currentYear}-09-30`,
      //   API_TOKEN
      // );
      // const oct = await getAllSales(
      //   `${currentYear}-10-01`,
      //   `${currentYear}-10-31`,
      //   API_TOKEN
      // );
      // const nov = await getAllSales(
      //   `${currentYear}-11-01`,
      //   `${currentYear}-11-30`,
      //   API_TOKEN
      // );
      // const dec = await getAllSales(
      //   `${currentYear}-12-01`,
      //   `${currentYear}-12-31`,
      //   API_TOKEN
      // );
      // // const febUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-02-01,end_date:${currentYear}-02-28`;
      // // const marUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-03-01,end_date:${currentYear}-03-31`;
      // // const aprUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-04-01,end_date:${currentYear}-04-30`;
      // // const mayUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-05-01,end_date:${currentYear}-05-31`;
      // // const junUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-06-01,end_date:${currentYear}-06-30`;
      // // const julUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-07-01,end_date:${currentYear}-07-31`;
      // // const augUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-08-01,end_date:${currentYear}-08-31`;
      // // const sepUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-09-01,end_date:${currentYear}-09-30`;
      // // const octUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-10-01,end_date:${currentYear}-10-31`;
      // // const novUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-11-01,end_date:${currentYear}-11-30`;
      // // const decUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-12-01,end_date:${currentYear}-12-31`;
      // // const response1 = await fetch(janUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response2 = await fetch(febUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response3 = await fetch(marUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response4 = await fetch(aprUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response5 = await fetch(mayUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response6 = await fetch(junUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response7 = await fetch(julUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response8 = await fetch(augUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response9 = await fetch(sepUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response10 = await fetch(octUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response11 = await fetch(novUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const response12 = await fetch(decUrl, {
      // //   method: "GET",
      // //   headers: {
      // //     Accept: "application/json",
      // //     Authorization: `Key ${API_TOKEN}`,
      // //   },
      // // });
      // // const jan = await response1.json();
      // // const feb = await response2.json();
      // // const mar = await response3.json();
      // // const apr = await response4.json();
      // // const may = await response5.json();
      // // const jun = await response6.json();
      // // const jul = await response7.json();
      // // const aug = await response8.json();
      // // const sep = await response9.json();
      // // const oct = await response10.json();
      // // const nov = await response11.json();
      // // const dec = await response12.json();

      // const janExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `01/01/${currentYear % 100}`,
      //   end: `01/31/${currentYear % 100}`,
      // });
      // jan["expenses"] = janExpenses;
      // const febExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `02/01/${currentYear % 100}`,
      //   end: `02/28/${currentYear % 100}`,
      // });
      // feb["expenses"] = febExpenses;
      // const marExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `03/01/${currentYear % 100}`,
      //   end: `03/31/${currentYear % 100}`,
      // });
      // mar["expenses"] = marExpenses;
      // const aprExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `04/01/${currentYear % 100}`,
      //   end: `04/30/${currentYear % 100}`,
      // });
      // apr["expenses"] = aprExpenses;
      // const mayExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `05/01/${currentYear % 100}`,
      //   end: `05/31/${currentYear % 100}`,
      // });
      // may["expenses"] = mayExpenses;
      // const junExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `06/01/${currentYear % 100}`,
      //   end: `06/30/${currentYear % 100}`,
      // });
      // jun["expenses"] = junExpenses;
      // const julExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `07/01/${currentYear % 100}`,
      //   end: `07/31/${currentYear % 100}`,
      // });
      // jul["expenses"] = julExpenses;
      // const augExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `08/01/${currentYear % 100}`,
      //   end: `08/31/${currentYear % 100}`,
      // });
      // aug["expenses"] = augExpenses;
      // const sepExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `09/01/${currentYear % 100}`,
      //   end: `09/30/${currentYear % 100}`,
      // });
      // sep["expenses"] = sepExpenses;
      // const octExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `10/01/${currentYear % 100}`,
      //   end: `10/31/${currentYear % 100}`,
      // });
      // oct["expenses"] = octExpenses;
      // const novExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `11/01/${currentYear % 100}`,
      //   end: `11/30/${currentYear % 100}`,
      // });
      // nov["expenses"] = novExpenses;
      // const decExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `12/01/${currentYear % 100}`,
      //   end: `12/31/${currentYear % 100}`,
      // });
      // dec["expenses"] = decExpenses;
      // // console.log("data", data);
      // let rev = [];
      // let unitSold = [];
      // let orders = [];
      // let refunds = [];
      // let refundCost = [];
      // let fee = [];
      // let grossProfit = [];
      // let margin = [];
      // let netProfit = [];
      // let promo = [];
      // let refundPercent = [];
      // let expenses = [];
      // let allMonths = [
      //   jan,
      //   feb,
      //   mar,
      //   apr,
      //   may,
      //   jun,
      //   jul,
      //   aug,
      //   sep,
      //   oct,
      //   nov,
      //   dec,
      // ];
      // allMonths.forEach((monthlySale) => {
      //   let newRev = 0;
      //   let newUnitSold = 0;
      //   let newRefund = 0;
      //   let newFee = 0;
      //   let newRefundCost = 0;
      //   let newExpense = 0;
      //   let newPromo = 0;
      //   if (monthlySale?.length > 0) {
      //     orders?.push(monthlySale?.length);
      //   }

      //   if (monthlySale?.length > 0) {
      //     monthlySale?.forEach((e) => {
      //       if (e?.sale_status === "Shipped to Customer") {
      //         let thisRev = e?.selling_price;
      //         newRev = newRev + thisRev;
      //         newUnitSold = newUnitSold + e?.quantity;
      //       }
      //       if (e?.sale_status === "Returned") {
      //         let thisRefundCost = e?.selling_price;
      //         newRefundCost = newRefundCost + thisRefundCost;
      //         newRefund = newRefund + e?.quantity;
      //       }
      //       if (e?.promotion) {
      //         let thisPromo = e?.selling_price;
      //         newPromo = newPromo + thisPromo;
      //       }
      //       newFee = newFee + e?.total_fee;
      //     });
      //     if (monthlySale?.expenses?.length > 0) {
      //       monthlySale?.expenses?.forEach((expense) => {
      //         newExpense = newExpense + expense?.amount;
      //       });
      //       expenses.push(newExpense);
      //     } else {
      //       expenses.push(newExpense);
      //     }
      //     grossProfit.push(newRev - newFee);
      //     promo.push(newPromo);
      //     netProfit.push(newRev - newFee - newExpense);
      //     rev.push(newRev);
      //     unitSold.push(newUnitSold);
      //     refunds.push(newRefund);
      //     refundCost.push(newRefundCost);
      //     fee.push(newFee);
      //     refundPercent.push((newRefund / newUnitSold) * 100);
      //     margin.push(((newRev - newFee - newExpense) / newRev) * 100);
      //   }
      //   // else {
      //   //   margin.push(0);
      //   //   refundPercent.push(0);
      //   //   promo.push(newPromo);
      //   //   netProfit.push(newRev - newFee - newExpense);
      //   //   grossProfit.push(newRev - newFee);
      //   //   rev.push(newRev);
      //   //   unitSold.push(newUnitSold);
      //   //   refunds.push(newRefund);
      //   //   refundCost.push(newRefundCost);
      //   //   fee.push(newFee);
      //   // }
      // });
      // res.status(200).json({
      //   rev,
      //   unitSold,
      //   refundCost,
      //   refunds,
      //   fee,
      //   orders,
      //   netProfit,
      //   margin,
      //   grossProfit,
      //   expenses,
      //   promo,
      //   refundPercent,
      // });
      // const months = [
      //   "01",
      //   "02",
      //   "03",
      //   "04",
      //   "05",
      //   "06",
      //   "07",
      //   "08",
      //   "09",
      //   "10",
      //   "11",
      //   "12",
      // ];

      // const promises = months.map(async (month) => {
      //   const startDate = `${currentYear}-${month}-01`;
      //   const endDate = `${currentYear}-${month}-${new Date(
      //     currentYear,
      //     month,
      //     0
      //   ).getDate()}`;

      //   const salesData = await getAllSales(startDate, endDate, API_TOKEN);
      //   const expensesData = await expensesApi.getExpensesByDateRange({
      //     start: `${month}/01/${currentYear % 100}`,
      //     end: `${month}/${new Date(currentYear, month, 0).getDate()}/${
      //       currentYear % 100
      //     }`,
      //   });

      //   const metrics = {
      //     rev: 0,
      //     unitSold: 0,
      //     refunds: 0,
      //     refundCost: 0,
      //     fee: 0,
      //     grossProfit: 0,
      //     margin: 0,
      //     netProfit: 0,
      //     promo: 0,
      //     refundPercent: 0,
      //     expenses: 0,
      //     orders: 0,
      //   };

      //   if (salesData.length > 0) {
      //     salesData.forEach((e) => {
      //       if (e.sale_status === "Shipped to Customer") {
      //         metrics.rev += e.selling_price;
      //         metrics.unitSold += e.quantity;
      //       }
      //       if (e.sale_status === "Returned") {
      //         metrics.refundCost += e.selling_price;
      //         metrics.refunds += e.quantity;
      //       }
      //       if (e.promotion) {
      //         metrics.promo += e.selling_price;
      //       }
      //       metrics.fee += e.total_fee;
      //     });

      //     if (expensesData.length > 0) {
      //       expensesData.forEach((expense) => {
      //         metrics.expenses += expense.amount;
      //       });
      //     }

      //     metrics.orders = salesData.length;
      //     metrics.grossProfit = metrics.rev - metrics.fee;
      //     metrics.netProfit = metrics.rev - metrics.fee - metrics.expenses;
      //     metrics.refundPercent = (metrics.refunds / metrics.unitSold) * 100;
      //     metrics.margin = (metrics.netProfit / metrics.rev) * 100;
      //   }

      //   return metrics;
      // });

      // Promise.all(promises)
      //   .then((results) => {
      //     // Combine the results into a single response
      //     res.status(200).json({
      //       rev: results.map((r) => r.rev),
      //       unitSold: results.map((r) => r.unitSold),
      //       refundCost: results.map((r) => r.refundCost),
      //       refunds: results.map((r) => r.refunds),
      //       fee: results.map((r) => r.fee),
      //       orders: results.map((r) => r.orders),
      //       netProfit: results.map((r) => r.netProfit),
      //       margin: results.map((r) => r.margin),
      //       grossProfit: results.map((r) => r.grossProfit),
      //       expenses: results.map((r) => r.expenses),
      //       promo: results.map((r) => r.promo),
      //       refundPercent: results.map((r) => r.refundPercent),
      //     });
      // })
      // .catch((error) => {
      //   res.status(500).json({ error: "An error occurred" });
      // });
      const currentDate = new Date();
      let startDate,
        endDate,
        startDate1,
        endDate1,
        startDate2,
        endDate2,
        salesData = [];

      // Calculate start and end dates based on duration
      switch (body?.duration) {
        case "Today":
          startDate = new Date(currentDate);
          endDate = new Date(currentDate);
          break;
        case "Yesterday":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 1);
          endDate = new Date(currentDate);
          endDate.setDate(endDate.getDate() - 1);
          break;
        case "This Month":
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          );
          break;
        case "Last Month":
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
          );
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          );
          break;
        case "This Year":
          startDate = new Date(currentDate.getFullYear(), 0, 1);
          endDate = new Date(currentDate.getFullYear(), 11, 31);
          startDate1 = new Date(currentDate.getFullYear(), 0, 1);
          endDate1 = new Date(currentDate.getFullYear(), 5, 30);
          startDate2 = new Date(currentDate.getFullYear(), 6, 1);
          endDate2 = new Date(currentDate.getFullYear(), 11, 31);
          break;
        case "Custom":
          startDate = new Date(body?.startDate);
          endDate = new Date(body?.endDate);
          break;
        default:
          throw new Error("Invalid duration");
      }
      if (body?.duration === "This Year") {
        if (body?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
          for (let it = 0; it < userApiKeys?.length; it++) {
            const first6MonthsSales = await getAllSalesNew(
              dayjs(startDate1).format("YYYY-MM-DD"),
              dayjs(endDate1).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey
            );
            const second6MonthsSales = await getAllSalesNew(
              dayjs(startDate2).format("YYYY-MM-DD"),
              dayjs(endDate2).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey
            );
            let newSales = first6MonthsSales.concat(second6MonthsSales);
            salesData = salesData?.concat(newSales);
          }
        } else {
          const first6MonthsSales = await getAllSalesNew(
            dayjs(startDate1).format("YYYY-MM-DD"),
            dayjs(endDate1).format("YYYY-MM-DD"),
            body?.marketplace
          );
          const second6MonthsSales = await getAllSalesNew(
            dayjs(startDate2).format("YYYY-MM-DD"),
            dayjs(endDate2).format("YYYY-MM-DD"),
            body?.marketplace
          );
          salesData = first6MonthsSales.concat(second6MonthsSales);
        }
      } else {
        if (body?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
          for (let it = 0; it < userApiKeys?.length; it++) {
            let newSales = await getAllSalesNew(
              dayjs(startDate).format("YYYY-MM-DD"),
              dayjs(endDate).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey
            );
            salesData = salesData?.concat(newSales);
          }
        } else {
          salesData = await getAllSalesNew(
            dayjs(startDate).format("YYYY-MM-DD"),
            dayjs(endDate).format("YYYY-MM-DD"),
            body?.marketplace
          );
        }
      }
      const expensesData = await expensesApi.getExpensesByDateRange({
        start: dayjs(startDate).format("DD MMM YYYY"),
        end: dayjs(endDate).format("DD MMM YYYY"),
      });
      // console.log("groupBy", body?.groupBy);
      // Group and calculate metrics based on groupBy
      let groupedData;
      switch (body?.groupBy) {
        case "Hourly":
          groupedData = groupBy.groupDataByHourly(salesData, expensesData);
          break;
        case "Daily":
          groupedData = groupBy.groupDataByDaily(salesData, expensesData);
          break;
        case "Weekly":
          groupedData = groupBy.groupDataByWeekly(salesData, expensesData);
          break;
        case "Monthly":
          groupedData = groupBy.groupDataByMonthly(salesData, expensesData);
          break;
        case "Quarterly":
          groupedData = groupBy.groupDataByQuarterly(salesData, expensesData);
          break;
        default:
          throw new Error("Invalid groupBy");
      }
      // console.log("groupedData", groupedData);
      // Create an array of all time intervals (hours, weeks, or months)
      let timeIntervals = [];
      switch (body?.groupBy) {
        case "Hourly":
          for (let hour = 0; hour < 24; hour++) {
            timeIntervals.push(`${groupBy.padZero(hour)}:00:00`);
          }
          break;
        case "Daily":
          timeIntervals = intervals.getDays(startDate, endDate);
          break;
        case "Weekly":
          // Create an array of weeks within the selected duration
          // You'll need to implement a function to calculate weeks
          // based on your requirements.
          timeIntervals = intervals.getWeeks(startDate, endDate);
          break;
        case "Monthly":
          // Create an array of months within the selected duration
          // You'll need to implement a function to calculate months
          // based on your requirements.
          timeIntervals = intervals.getMonths(startDate, endDate);
          break;
        // Add similar cases for other groupBy types
      }

      // console.log("timeIntervals", timeIntervals);

      // Calculate metrics for each time interval, filling in missing data with zeros
      const metrics = {
        rev: new Array(timeIntervals.length).fill(0),
        unitSold: new Array(timeIntervals.length).fill(0),
        refunds: new Array(timeIntervals.length).fill(0),
        refundCost: new Array(timeIntervals.length).fill(0),
        fee: new Array(timeIntervals.length).fill(0),
        grossProfit: new Array(timeIntervals.length).fill(0),
        margin: new Array(timeIntervals.length).fill(0),
        netProfit: new Array(timeIntervals.length).fill(0),
        promo: new Array(timeIntervals.length).fill(0),
        refundPercent: new Array(timeIntervals.length).fill(0),
        expenses: new Array(timeIntervals.length).fill(0),
        orders: new Array(timeIntervals.length).fill(0),
      };

      for (let i = 0; i < timeIntervals.length; i++) {
        const intervalKey = timeIntervals[i];
        if (groupedData[intervalKey]) {
          const group = groupedData[intervalKey];
          metrics.rev[i] = group.rev;
          metrics.unitSold[i] = group.unitSold;
          metrics.refunds[i] = group.refunds;
          metrics.refundCost[i] = group.refundCost;
          metrics.fee[i] = group.fee;
          metrics.grossProfit[i] = group.grossProfit;
          metrics.margin[i] = group.margin;
          metrics.netProfit[i] = group.netProfit;
          metrics.promo[i] = group.promo;
          metrics.refundPercent[i] = group.refundPercent;
          metrics.expenses[i] = group.expenses;
          metrics.orders[i] = group.orders;
        }
      }

      res.status(200).json({ metrics, timeIntervals });
    } else {
      const currentDate = new Date();
      let startDate,
        endDate,
        startDate1,
        endDate1,
        startDate2,
        endDate2,
        salesData;

      // Calculate start and end dates based on duration
      switch (body?.duration) {
        case "Today":
          startDate = new Date(currentDate);
          endDate = new Date(currentDate);
          break;
        case "Yesterday":
          startDate = new Date(currentDate);
          startDate.setDate(startDate.getDate() - 1);
          endDate = new Date(currentDate);
          endDate.setDate(endDate.getDate() - 1);
          break;
        case "This Month":
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          );
          break;
        case "Last Month":
          startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
          );
          endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          );
          break;
        case "This Year":
          startDate = new Date(currentDate.getFullYear(), 0, 1);
          endDate = new Date(currentDate.getFullYear(), 11, 31);
          startDate1 = new Date(currentDate.getFullYear(), 0, 1);
          endDate1 = new Date(currentDate.getFullYear(), 5, 30);
          startDate2 = new Date(currentDate.getFullYear(), 6, 1);
          endDate2 = new Date(currentDate.getFullYear(), 11, 31);
          break;
        case "Custom":
          startDate = new Date(body?.startDate);
          endDate = new Date(body?.endDate);
          break;
        default:
          throw new Error("Invalid duration");
      }
      // console.log("start after", startDate);
      // console.log("end after", endDate);
      if (body?.duration === "This Year") {
        const first6MonthsSales = await getAllSalesByProduct(
          dayjs(startDate1).format("YYYY-MM-DD"),
          dayjs(endDate1).format("YYYY-MM-DD"),
          API_TOKEN,
          true,
          body?.productTitle
        );
        const second6MonthsSales = await getAllSalesByProduct(
          dayjs(startDate2).format("YYYY-MM-DD"),
          dayjs(endDate2).format("YYYY-MM-DD"),
          API_TOKEN,
          true,
          body?.productTitle
        );
        salesData = first6MonthsSales.concat(second6MonthsSales);
      } else {
        salesData = await getAllSalesByProduct(
          dayjs(startDate).format("YYYY-MM-DD"),
          dayjs(endDate).format("YYYY-MM-DD"),
          API_TOKEN,
          true,
          body?.productTitle
        );
      }
      // console.log("salesData", salesData?.length);
      const expensesData = await expensesApi.getExpensesByDateRange({
        start: dayjs(startDate).format("DD MMM YYYY"),
        end: dayjs(endDate).format("DD MMM YYYY"),
      });
      // console.log("groupBy", body?.groupBy);
      // Group and calculate metrics based on groupBy
      let groupedData;
      switch (body?.groupBy) {
        case "Hourly":
          groupedData = groupBy.groupDataByHourly(salesData, expensesData);
          break;
        case "Daily":
          groupedData = groupBy.groupDataByDaily(salesData, expensesData);
          break;
        case "Weekly":
          groupedData = groupBy.groupDataByWeekly(salesData, expensesData);
          break;
        case "Monthly":
          groupedData = groupBy.groupDataByMonthly(salesData, expensesData);
          break;
        case "Quarterly":
          groupedData = groupBy.groupDataByQuarterly(salesData, expensesData);
          break;
        default:
          throw new Error("Invalid groupBy");
      }
      // console.log("group24edData", groupedData);
      // Create an array of all time intervals (hours, weeks, or months)
      let timeIntervals = [];
      switch (body?.groupBy) {
        case "Hourly":
          for (let hour = 0; hour < 24; hour++) {
            timeIntervals.push(`${groupBy.padZero(hour)}:00:00`);
          }
          break;
        case "Daily":
          timeIntervals = intervals.getDays(startDate, endDate);
          break;
        case "Weekly":
          // Create an array of weeks within the selected duration
          // You'll need to implement a function to calculate weeks
          // based on your requirements.
          timeIntervals = intervals.getWeeks(startDate, endDate);
          break;
        case "Monthly":
          // Create an array of months within the selected duration
          // You'll need to implement a function to calculate months
          // based on your requirements.
          timeIntervals = intervals.getMonths(startDate, endDate);
          break;
        // Add similar cases for other groupBy types
      }

      // console.log("grouped", groupedData);

      // Calculate metrics for each time interval, filling in missing data with zeros
      const metrics = {
        rev: new Array(timeIntervals.length).fill(0),
        unitSold: new Array(timeIntervals.length).fill(0),
        refunds: new Array(timeIntervals.length).fill(0),
        refundCost: new Array(timeIntervals.length).fill(0),
        fee: new Array(timeIntervals.length).fill(0),
        grossProfit: new Array(timeIntervals.length).fill(0),
        margin: new Array(timeIntervals.length).fill(0),
        netProfit: new Array(timeIntervals.length).fill(0),
        promo: new Array(timeIntervals.length).fill(0),
        refundPercent: new Array(timeIntervals.length).fill(0),
        expenses: new Array(timeIntervals.length).fill(0),
        orders: new Array(timeIntervals.length).fill(0),
      };

      for (let i = 0; i < timeIntervals.length; i++) {
        const intervalKey = timeIntervals[i];
        if (groupedData[intervalKey]) {
          const group = groupedData[intervalKey];
          metrics.rev[i] = group.rev;
          metrics.unitSold[i] = group.unitSold;
          metrics.refunds[i] = group.refunds;
          metrics.refundCost[i] = group.refundCost;
          metrics.fee[i] = group.fee;
          metrics.grossProfit[i] = group.grossProfit;
          metrics.margin[i] = group.margin;
          metrics.netProfit[i] = group.netProfit;
          metrics.promo[i] = group.promo;
          metrics.refundPercent[i] = group.refundPercent;
          metrics.expenses[i] = group.expenses;
          metrics.orders[i] = group.orders;
        }
      }

      res.status(200).json({ metrics, timeIntervals });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
