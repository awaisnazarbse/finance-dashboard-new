import expensesApi from "@/lib/expense";
import offersApi from "@/lib/offers";
import userApi from "@/lib/user";
import getAllSalesByProduct from "@/utils/getAllSalesByProduct";
import getAllSalesNew from "@/utils/getAllSalesNew";
import getAllTransactions from "@/utils/getAllTransactions";
import getCog from "@/utils/getCog";
import getCogNew from "@/utils/getCogNew";
import getDateRangeFormatted from "@/utils/getDateRangeFormatted";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  try {
    let cogs = 0;
    let adCreditFee = 0;
    let subscriptionFee = 0;
    let storageFee = 0;
    let manualReversalFee = 0;
    let transactions = [];
    const { startDate, endDate } = getDateRangeFormatted(
      body?.duration,
      body?.startDate,
      body?.endDate
    );
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    // if (body?.duration !== "This Year") {
    //   const transactions = await getAllTransactions(
    //     dayjs(body?.startDate).format("YYYY-MM-DD"),
    //     dayjs(body?.endDate).format("YYYY-MM-DD"),
    //     "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5",
    //     true
    //   );
    //   console.log("transactions leng", transactions.length);
    //   if (transactions?.length > 0) {
    //     transactions.forEach((e) => {
    //       if (e?.transaction_type?.description === "Ad Credit Purchase") {
    //         adCreditFee += Number(e?.inc_vat);
    //       } else if (
    //         e?.transaction_type?.description === "Subscription Fee Charge"
    //       ) {
    //         subscriptionFee += Number(e?.inc_vat);
    //       } else if (
    //         e?.transaction_type?.description === "Storage Fee Charge"
    //       ) {
    //         storageFee += Number(e?.inc_vat);
    //       } else if (e?.transaction_type?.description === "Manual Reversal") {
    //         manualReversalFee += Number(e?.inc_vat);
    //       }
    //     });
    //   }
    // }
    if (body?.marketplace === "All market places") {
      const userApis = await userApi.getActiveUserAPIKeys(body?.uid);
      let totalRevenue = 0;
      let takealotFee = 0;
      let unitSold = 0;
      let totalExpenses = 0;
      let cptRevenue = 0;
      let jhbRevenue = 0;
      let cptTakealotFee = 0;
      let jhbTakealotFee = 0;
      let cptUnitSold = 0;
      let jhbUnitSold = 0;
      let returnTotal = 0;
      let returnCost = 0;
      let cptReturnTotal = 0;
      let cptReturnCost = 0;
      let jhbReturnTotal = 0;
      let jhbReturnCost = 0;
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
            // let first6MonthsTransactions = await getAllTransactions(
            //   dayjs(first6MonthsStart).format("YYYY-MM-DD"),
            //   dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
            //   userApis[it]?.apiKey
            // );
            // let second6MonthsTransactions = await getAllTransactions(
            //   dayjs(second6MonthsStart).format("YYYY-MM-DD"),
            //   dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
            //   userApis[it]?.apiKey
            // );

            sales = first6MonthsSales?.concat(second6MonthsSales);
            // transactions = first6MonthsTransactions?.concat(
            //   second6MonthsTransactions
            // );
          } else {
            sales = await getAllSalesNew(
              startDate,
              endDate,
              userApis[it]?.apiKey
            );
            transactions = await getAllTransactions(
              startDate,
              endDate,
              userApis[it]?.apiKey
            );
          }
          sales?.forEach((e) => {
            if (
              !e?.sale_status?.includes("Cancelled")
            ) {
              totalRevenue += e?.selling_price;
              unitSold += e?.quantity;
            }
            takealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              returnTotal += e?.quantity;
              returnCost += e?.selling_price - e?.total_fee;
            }
            if (e?.dc === "JHB") {
              if (
                !e?.sale_status?.includes("Cancelled")
              ) {
                jhbRevenue += e?.selling_price;
                jhbUnitSold += e?.quantity;
              }
              jhbTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                jhbReturnTotal += e?.quantity;
                jhbReturnCost += e?.selling_price - e?.total_fee;
              }
            }

            if (e?.dc === "CPT") {
              if (
                !e?.sale_status?.includes("Cancelled")
              ) {
                cptRevenue += e?.selling_price;
                cptUnitSold += e?.quantity;
              }
              cptTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                cptReturnTotal += e?.quantity;
                cptReturnCost += e?.selling_price - e?.total_fee;
              }
            }
          });

          const expenses = await expensesApi.getExpensesByDateRange({
            start: dayjs(body?.startDate).format("DD MMM YYYY"),
            end: dayjs(body?.endDate).format("DD MMM YYYY"),
          });
          expenses?.forEach((expense) => {
            totalExpenses = totalExpenses + expense?.amount;
          });

          const offerIds = [...new Set(sales?.map((sale) => sale.offer_id))];
          cogs = await getCog(offerIds);
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
              startDate,
              endDate,
              userApis[it]?.apiKey,
              true,
              body?.productTitle
            );
          }

          sales?.forEach((e) => {
            if (
              !e?.sale_status?.includes("Cancelled")
            ) {
              totalRevenue += e?.selling_price;
              unitSold += e?.quantity;
            }
            takealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              returnTotal += e?.quantity;
              returnCost += e?.selling_price - e?.total_fee;
            }
            if (e?.dc === "JHB") {
              if (
                !e?.sale_status?.includes("Cancelled")
              ) {
                jhbRevenue += e?.selling_price;
                jhbUnitSold += e?.quantity;
              }
              jhbTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                jhbReturnTotal += e?.quantity;
                jhbReturnCost += e?.selling_price - e?.total_fee;
              }
            }

            if (e?.dc === "CPT") {
              if (
                !e?.sale_status?.includes("Cancelled")
              ) {
                cptRevenue += e?.selling_price;
                cptUnitSold += e?.quantity;
              }
              cptTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                cptReturnTotal += e?.quantity;
                cptReturnCost += e?.selling_price - e?.total_fee;
              }
            }
          });

          const expenses = await expensesApi.getExpensesByDateRange({
            start: dayjs(body?.startDate).format("DD MMM YYYY"),
            end: dayjs(body?.endDate).format("DD MMM YYYY"),
          });
          expenses?.forEach((expense) => {
            totalExpenses = totalExpenses + expense?.amount;
          });
          cogs = await offersApi.getOfferCOGByTitle(body?.productTitle);
          // res.status(200).json({
          //   totalRevenue,
          //   takealotFee,
          //   unitSold,
          //   totalExpenses,
          //   cptRevenue,
          //   jhbRevenue,
          //   cptTakealotFee,
          //   jhbTakealotFee,
          //   cptUnitSold,
          //   jhbUnitSold,
          //   returnTotal,
          //   returnCost,
          //   cptReturnTotal,
          //   cptReturnCost,
          //   jhbReturnTotal,
          //   jhbReturnCost,
          // });
        }
      }

      if (transactions?.length > 0) {
        transactions.forEach((e) => {
          if (e?.transaction_type?.description === "Ad Credit Purchase") {
            adCreditFee += Number(e?.inc_vat);
          } else if (
            e?.transaction_type?.description === "Subscription Fee Charge"
          ) {
            subscriptionFee += Number(e?.inc_vat);
          } else if (
            e?.transaction_type?.description === "Storage Fee Charge"
          ) {
            storageFee += Number(e?.inc_vat);
          } else if (e?.transaction_type?.description === "Manual Reversal") {
            manualReversalFee += Number(e?.inc_vat);
          }
        });
      }

      res.status(200).json({
        totalRevenue,
        takealotFee: takealotFee + manualReversalFee,
        unitSold,
        totalExpenses:
          totalExpenses + storageFee + subscriptionFee + adCreditFee,
        cptRevenue,
        jhbRevenue,
        cptTakealotFee,
        jhbTakealotFee,
        cptUnitSold,
        jhbUnitSold,
        returnTotal,
        returnCost,
        cptReturnTotal,
        cptReturnCost,
        jhbReturnTotal,
        jhbReturnCost,
        cogs,
        storageFee,
        manualReversalFee,
        subscriptionFee,
        adCreditFee,
      });
    } else {
      const API_TOKEN = body?.marketplace;
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
            "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5"
          );
          let second6MonthsSales = await getAllSalesNew(
            dayjs(second6MonthsStart).format("YYYY-MM-DD"),
            dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
            "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5"
          );
          // let first6MonthsTransactions = await getAllTransactions(
          //   dayjs(first6MonthsStart).format("YYYY-MM-DD"),
          //   dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
          //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5"
          // );
          // let second6MonthsTransactions = await getAllTransactions(
          //   dayjs(second6MonthsStart).format("YYYY-MM-DD"),
          //   dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
          //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5"
          // );

          sales = first6MonthsSales?.concat(second6MonthsSales);
          // transactions = first6MonthsTransactions?.concat(
          //   second6MonthsTransactions
          // );
        } else {
          sales = await getAllSalesNew(
            startDate,
            endDate,
            "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5"
          );
          transactions = await getAllTransactions(
            startDate,
            endDate,
            "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5"
          );
        }
        let totalRevenue = 0;
        let takealotFee = 0;
        let unitSold = 0;
        let totalExpenses = 0;
        let cptRevenue = 0;
        let jhbRevenue = 0;
        let cptTakealotFee = 0;
        let jhbTakealotFee = 0;
        let cptUnitSold = 0;
        let jhbUnitSold = 0;
        let returnTotal = 0;
        let returnCost = 0;
        let cptReturnTotal = 0;
        let cptReturnCost = 0;
        let jhbReturnTotal = 0;
        let jhbReturnCost = 0;
        let cogs = 0;

        const offerIds = [...new Set(sales?.map((sale) => sale.offer_id))];
        // cogs = await getCog(offerIds);
        // const offersCogs = await offersApi.getOfferCogsByOfferIds(offerIds);
        const offersCogs = await getCogNew(offerIds);
        sales?.forEach((e) => {
          const foundOfferCog = offersCogs?.find(
            (cog) => cog?.offer_id === e?.offer_id
          );
          if (foundOfferCog) {
            const newCog = e?.quantity * foundOfferCog?.cog;
            cogs += newCog;
          }
          if (
            !e?.sale_status?.includes("Cancelled")
          ) {
            // console.log("totalRevenue", totalRevenue);
            totalRevenue += e?.selling_price;
            unitSold += e?.quantity;
          }
          takealotFee += e?.total_fee;
          if (e?.sale_status === "Returned") {
            // console.log("return total", e?.selling_price);
            returnTotal += e?.quantity;
            returnCost += e?.selling_price - e?.total_fee;
          }
          if (e?.dc === "JHB") {
            if (
              !e?.sale_status?.includes("Cancelled")
            ) {
              jhbRevenue += e?.selling_price;
              jhbUnitSold += e?.quantity;
            }
            jhbTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              // console.log("return dc", e?.selling_price);

              jhbReturnTotal += e?.quantity;
              jhbReturnCost += e?.selling_price - e?.total_fee;
            }
          }

          if (e?.dc === "CPT") {
            if (
              !e?.sale_status?.includes("Cancelled")
            ) {
              cptRevenue += e?.selling_price;
              cptUnitSold += e?.quantity;
            }
            cptTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              // console.log("return dc", e?.selling_price);
              cptReturnTotal += e?.quantity;
              cptReturnCost += e?.selling_price - e?.total_fee;
            }
          }
        });

        const expenses = await expensesApi.getExpensesByDateRange({
          start: dayjs(body?.startDate).format("DD MMM YYYY"),
          end: dayjs(body?.endDate).format("DD MMM YYYY"),
        });
        expenses?.forEach((expense) => {
          totalExpenses = totalExpenses + expense?.amount;
        });

        // console.log("data in api", {
        //   totalRevenue,
        //   takealotFee,
        //   unitSold,
        //   totalExpenses,
        //   cptRevenue,
        //   jhbRevenue,
        //   cptTakealotFee,
        //   jhbTakealotFee,
        //   cptUnitSold,
        //   jhbUnitSold,
        //   returnTotal,
        //   returnCost,
        //   cptReturnTotal,
        //   cptReturnCost,
        //   jhbReturnTotal,
        //   jhbReturnCost,
        //   cogs,
        // });

        if (transactions?.length > 0) {
          transactions.forEach((e) => {
            if (e?.transaction_type?.description === "Ad Credit Purchase") {
              adCreditFee += Number(e?.inc_vat);
            } else if (
              e?.transaction_type?.description === "Subscription Fee Charge"
            ) {
              subscriptionFee += Number(e?.inc_vat);
            } else if (
              e?.transaction_type?.description === "Storage Fee Charge"
            ) {
              storageFee += Number(e?.inc_vat);
            } else if (e?.transaction_type?.description === "Manual Reversal") {
              manualReversalFee += Number(e?.inc_vat);
            }
          });
        }

        res.status(200).json({
          totalRevenue,
          takealotFee: takealotFee + manualReversalFee,
          unitSold,
          totalExpenses:
            totalExpenses + storageFee + subscriptionFee + adCreditFee,
          cptRevenue,
          jhbRevenue,
          cptTakealotFee,
          jhbTakealotFee,
          cptUnitSold,
          jhbUnitSold,
          returnTotal,
          returnCost,
          cptReturnTotal,
          cptReturnCost,
          jhbReturnTotal,
          jhbReturnCost,
          cogs,
          storageFee,
          manualReversalFee,
          subscriptionFee,
          adCreditFee,
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
            API_TOKEN,
            true,
            body?.productTitle
          );
          let second6MonthsSales = await getAllSalesByProduct(
            dayjs(second6MonthsStart).format("YYYY-MM-DD"),
            dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
            API_TOKEN,
            true,
            body?.productTitle
          );

          sales = first6MonthsSales?.concat(second6MonthsSales);
        } else {
          sales = await getAllSalesByProduct(
            startDate,
            endDate,
            API_TOKEN,
            true,
            body?.productTitle
          );
        }

        let totalRevenue = 0;
        let takealotFee = 0;
        let unitSold = 0;
        let totalExpenses = 0;
        let cptRevenue = 0;
        let jhbRevenue = 0;
        let cptTakealotFee = 0;
        let jhbTakealotFee = 0;
        let cptUnitSold = 0;
        let jhbUnitSold = 0;
        let returnTotal = 0;
        let returnCost = 0;
        let cptReturnTotal = 0;
        let cptReturnCost = 0;
        let jhbReturnTotal = 0;
        let jhbReturnCost = 0;

        sales?.forEach((e) => {
          if (
            !e?.sale_status?.includes("Cancelled")
          ) {
            totalRevenue += e?.selling_price;
            unitSold += e?.quantity;
          }
          takealotFee += e?.total_fee;
          if (e?.sale_status === "Returned") {
            returnTotal += e?.quantity;
            returnCost += e?.selling_price - e?.total_fee;
          }
          if (e?.dc === "JHB") {
            if (
              !e?.sale_status?.includes("Cancelled")
            ) {
              jhbRevenue += e?.selling_price;
              jhbUnitSold += e?.quantity;
            }
            jhbTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              jhbReturnTotal += e?.quantity;
              jhbReturnCost += e?.selling_price - e?.total_fee;
            }
          }

          if (e?.dc === "CPT") {
            if (
              !e?.sale_status?.includes("Cancelled")
            ) {
              cptRevenue += e?.selling_price;
              cptUnitSold += e?.quantity;
            }
            cptTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              cptReturnTotal += e?.quantity;
              cptReturnCost += e?.selling_price - e?.total_fee;
            }
          }
        });

        const expenses = await expensesApi.getExpensesByDateRange({
          start: dayjs(body?.startDate).format("DD MMM YYYY"),
          end: dayjs(body?.endDate).format("DD MMM YYYY"),
        });
        expenses?.forEach((expense) => {
          totalExpenses = totalExpenses + expense?.amount;
        });
        cogs = await offersApi.getOfferCOGByTitle(body?.productTitle);

        if (transactions?.length > 0) {
          transactions.forEach((e) => {
            if (e?.transaction_type?.description === "Ad Credit Purchase") {
              adCreditFee += Number(e?.inc_vat);
            } else if (
              e?.transaction_type?.description === "Subscription Fee Charge"
            ) {
              subscriptionFee += Number(e?.inc_vat);
            } else if (
              e?.transaction_type?.description === "Storage Fee Charge"
            ) {
              storageFee += Number(e?.inc_vat);
            } else if (e?.transaction_type?.description === "Manual Reversal") {
              manualReversalFee += Number(e?.inc_vat);
            }
          });
        }

        res.status(200).json({
          totalRevenue,
          takealotFee: takealotFee + manualReversalFee,
          unitSold,
          totalExpenses:
            totalExpenses + storageFee + subscriptionFee + adCreditFee,
          cptRevenue,
          jhbRevenue,
          cptTakealotFee,
          jhbTakealotFee,
          cptUnitSold,
          jhbUnitSold,
          returnTotal,
          returnCost,
          cptReturnTotal,
          cptReturnCost,
          jhbReturnTotal,
          jhbReturnCost,
          cogs,
          storageFee,
          manualReversalFee,
          subscriptionFee,
          adCreditFee,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      error: error,
    });
  }
}
