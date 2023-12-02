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
    const API_TOKEN = body?.apiKey;
    if (body?.productTitle === "") {
      let data = [];
      if (body?.duration === "This Year") {
        let startDateNew = new Date(body?.startDate);
        const first6MonthsStart = startDateNew;
        const first6MonthsEnd = new Date(startDateNew);
        first6MonthsEnd.setMonth(startDateNew?.getMonth() + 6, 0);

        const second6MonthsStart = new Date(startDateNew);
        second6MonthsStart.setMonth(startDateNew?.getMonth() + 6, 1);
        const second6MonthsEnd = new Date(startDateNew);
        second6MonthsEnd.setMonth(startDateNew?.getMonth() + 12, 0);
        if (body?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
          for (let it = 0; it < userApiKeys?.length; it++) {
            let first6MonthsSales = await getAllSalesNew(
              dayjs(first6MonthsStart).format("YYYY-MM-DD"),
              dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey
            );
            let second6MonthsSales = await getAllSalesNew(
              dayjs(second6MonthsStart).format("YYYY-MM-DD"),
              dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey
            );
            // let first6MonthsTransactions = await getAllTransactions(
            //   dayjs(first6MonthsStart).format("YYYY-MM-DD"),
            //   dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
            //   userApiKeys[it]?.apiKey
            // );
            // let second6MonthsTransactions = await getAllTransactions(
            //   dayjs(second6MonthsStart).format("YYYY-MM-DD"),
            //   dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
            //   userApiKeys[it]?.apiKey
            // );
            let newSales = first6MonthsSales.concat(second6MonthsSales);
            // let newTransactions = first6MonthsTransactions.concat(
            //   second6MonthsTransactions
            // );
            // transactions = transactions.concat(newTransactions);
            data = data?.concat(newSales);
          }
        } else {
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

          // let first6MonthsTransactions = await getAllTransactions(
          //   dayjs(first6MonthsStart).format("YYYY-MM-DD"),
          //   dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
          //   body?.marketplace
          // );
          // let second6MonthsTransactions = await getAllTransactions(
          //   dayjs(second6MonthsStart).format("YYYY-MM-DD"),
          //   dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
          //   body?.marketplace
          // );
          data = first6MonthsSales?.concat(second6MonthsSales);
          // transactions = first6MonthsTransactions?.concat(
          //   second6MonthsTransactions
          // );
        }
      } else {
        if (body?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
          for (let it = 0; it < userApiKeys?.length; it++) {
            let newSales = await getAllSalesNew(
              startDate,
              endDate,
              userApiKeys[it]?.apiKey
            );
            let newTransactions = await getAllTransactions(
              startDate,
              endDate,
              userApiKeys[it]?.apiKey
            );

            data = data?.concat(newSales);
            transactions = transactions?.concat(newTransactions);
          }
        } else {
          data = await getAllSalesNew(startDate, endDate, body?.marketplace);
          transactions = await getAllTransactions(
            startDate,
            endDate,
            body?.marketplace
          );
        }
      }
      const expenses = await expensesApi.getExpensesByDateRangeWithByCategories(
        {
          start: dayjs(body?.startDate).format("DD MMM YYYY"),
          end: dayjs(body?.endDate).format("DD MMM YYYY"),
        }
      );
      const offerIds = [...new Set(data?.map((sale) => sale.offer_id))];
      // let cogs = await getCog(offerIds);
      // const offersCogs = await offersApi.getOfferCogsByOfferIds(offerIds);
      const offersCogs = await getCogNew(offerIds);

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

      let sales = 0;
      let units = 0;
      let promo = 0;
      let returnCost = 0;
      let fee = 0;
      let successFee = 0;
      let fulfillmentFee = 0;
      let courierCollectionFee = 0;
      let autoIbtFee = 0;
      let totalReturnedUnits = 0;
      let totalExpenses = 0;
      let cogs = 0;
      if (expenses?.data?.length > 0) {
        Promise.all(
          expenses?.data?.map((expense) => {
            totalExpenses = totalExpenses + expense?.totalExpense;
          })
        );
      }
      Promise.all(
        data?.map((sale) => {
          const foundOfferCog = offersCogs?.find(
            (cog) => cog?.offer_id === sale?.offer_id
          );
          if (foundOfferCog) {
            const newCog = sale?.quantity * foundOfferCog?.cog;
            cogs += newCog;
          }
          if (
            !sale?.sale_status?.includes("Cancelled")
          ) {
            sales += sale?.selling_price;
            units += sale?.quantity;
          }
          if (sale?.promotion) {
            promo += sale?.selling_price;
          }
          if (sale?.sale_status === "Returned") {
            returnCost += sale?.selling_price - sales?.total_fee;
            totalReturnedUnits += sale?.quantity;
          }
          fee += sale?.total_fee;
          successFee += sale?.success_fee;
          fulfillmentFee += sale?.fulfillment_fee;
          courierCollectionFee += sale?.courier_collection_fee;
          autoIbtFee += sale?.auto_ibt_fee;
        })
      );
      res.status(200).json({
        sales,
        units,
        promo,
        returnCost,
        fee: fee + manualReversalFee,
        storageFee,
        manualReversalFee,
        subscriptionFee,
        adCreditFee,
        totalReturnedUnits,
        totalExpenses:
          totalExpenses + storageFee + adCreditFee + subscriptionFee,
        successFee,
        fulfillmentFee,
        autoIbtFee,
        courierCollectionFee,
        expenseCategories: expenses?.categoriesExpenses,
        cogs,
      });
    } else {
      let data = [];
      if (body?.duration === "This Year") {
        let startDateNew = new Date(body?.startDate);
        const first6MonthsStart = startDateNew;
        const first6MonthsEnd = new Date(startDateNew);
        first6MonthsEnd.setMonth(startDateNew?.getMonth() + 6, 0);

        const second6MonthsStart = new Date(startDateNew);
        second6MonthsStart.setMonth(startDateNew?.getMonth() + 6, 1);
        const second6MonthsEnd = new Date(startDateNew);
        second6MonthsEnd.setMonth(startDateNew?.getMonth() + 12, 0);
        if (body?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
          for (let it = 0; it < userApiKeys?.length; it++) {
            let first6MonthsSales = await getAllSalesByProduct(
              dayjs(first6MonthsStart).format("YYYY-MM-DD"),
              dayjs(first6MonthsEnd).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey,
              true,
              body?.productTitle
            );
            let second6MonthsSales = await getAllSalesByProduct(
              dayjs(second6MonthsStart).format("YYYY-MM-DD"),
              dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey,
              true,
              body?.productTitle
            );

            let newSales = first6MonthsSales.concat(second6MonthsSales);
            data = data?.concat(newSales);
          }
        } else {
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

          data = first6MonthsSales.concat(second6MonthsSales);
        }
      } else {
        if (body?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
          for (let it = 0; it < userApiKeys?.length; it++) {
            let newSales = await getAllSalesByProduct(
              startDate,
              endDate,
              userApiKeys[it]?.apiKey,
              true,
              body?.productTitle
            );

            data = data?.concat(newSales);
          }
        } else {
          data = await getAllSalesByProduct(
            startDate,
            endDate,
            body?.marketplace,
            true,
            body?.productTitle
          );
        }
      }
      // const expenses = await expensesApi.getExpensesByDateRange({
      //   start: dayjs(body?.startDate).format("DD/MM/YY"),
      //   end: dayjs(body?.endDate).format("DD/MM/YY"),
      // });
      const expenses = await expensesApi.getExpensesByDateRangeWithByCategories(
        {
          start: dayjs(body?.startDate).format("DD MMM YYYY"),
          end: dayjs(body?.endDate).format("DD MMM YYYY"),
        }
      );
      let cogs = await offersApi.getOfferCOGByTitle(body?.productTitle);
      let sales = 0;
      let units = 0;
      let promo = 0;
      let returnCost = 0;
      let fee = 0;
      let successFee = 0;
      let fulfillmentFee = 0;
      let courierCollectionFee = 0;
      let autoIbtFee = 0;
      let totalReturnedUnits = 0;
      let totalExpenses = 0;
      if (expenses?.length > 0) {
        Promise.all(
          expenses?.data?.map((expense) => {
            totalExpenses = totalExpenses + expense?.totalExpense;
          })
        );
      }
      Promise.all(
        data?.map((sale) => {
          if (
            !sale?.sale_status?.includes("Cancelled")
          ) {
            sales += sale?.selling_price;
            units += sale?.quantity;
          }
          if (sale?.promotion) {
            promo += sale?.selling_price;
          }
          if (sale?.sale_status === "Returned") {
            returnCost += sale?.selling_price - sale?.total_fee;
            totalReturnedUnits += sale?.quantity;
          }
          fee += sale?.total_fee;
          successFee += sale?.success_fee;
          fulfillmentFee += sale?.fulfillment_fee;
          courierCollectionFee += sale?.courier_collection_fee;
          autoIbtFee += sale?.auto_ibt_fee;
        })
      );
      res.status(200).json({
        sales,
        units,
        promo,
        returnCost,
        fee: fee + manualReversalFee,
        storageFee,
        manualReversalFee,
        subscriptionFee,
        adCreditFee,
        totalReturnedUnits,
        totalExpenses:
          totalExpenses + storageFee + adCreditFee + subscriptionFee,
        successFee,
        fulfillmentFee,
        autoIbtFee,
        courierCollectionFee,
        expenseCategories: expenses?.categoriesExpenses,
        cogs: cogs * units,
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
