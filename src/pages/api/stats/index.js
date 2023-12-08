import expensesApi from "@/lib/expense";
import dayjs from "dayjs";
import getAllSalesByProduct from "@/utils/getAllSalesByProduct";
import userApi from "@/lib/user";
import offersApi from "@/lib/offers";
import getAllSalesNew from "@/utils/getAllSalesNew";
import getCog from "@/utils/getCog";
import getTransactionsByType from "@/utils/getTransactionsByType";

export default async function handler(req, res) {
  const data = req.body;
  try {
    let stats = [];

    // console.log("dates in stats", data?.dates);
    for (let i = 0; i < data?.dates?.length; i++) {
      const startDate = dayjs(data?.dates[i]?.start).format("YYYY-MM-DD");
      const endDate = dayjs(data?.dates[i]?.end).format("YYYY-MM-DD");
      // console.log("startDate in for", startDate);
      // console.log("endDate in for", endDate);
      let sales = [];
      let cogs = 0;
      let adCreditFee = 0;
      let subscriptionFee = 0;
      let storageFee = 0;
      let manualReversalFee = 0;
      let transactions = [];
      if (data?.productTitle === "") {
        if (data?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(data?.uid);

          for (let i = 0; i < userApiKeys?.length; i++) {
            let newSales = await getAllSalesNew(
              startDate,
              endDate,
              userApiKeys[i]?.apiKey
            );
            let newTrans = await getTransactionsByType(
              startDate,
              endDate,
              userApiKeys[i]?.apiKey
            );

            sales = sales?.concat(newSales);
            transactions = transactions?.concat(newTrans);
          }
        } else {
          sales = await getAllSalesNew(startDate, endDate, data?.marketplace);
          transactions = await getTransactionsByType(
            startDate,
            endDate,
            data?.marketplace
          );
        }
        const offerIds = [...new Set(sales?.map((sale) => sale.offer_id))];
        cogs = await getCog(offerIds);
      } else {
        if (data?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(data?.uid);

          for (let i = 0; i < userApiKeys?.length; i++) {
            let newSales = await getAllSalesByProduct(
              startDate,
              endDate,
              userApiKeys[i]?.apiKey,
              true,
              data?.productTitle
            );
            sales = sales?.concat(newSales);
          }
        } else {
          sales = await getAllSalesByProduct(
            startDate,
            endDate,
            data?.marketplace,
            true,
            data?.productTitle
          );
        }
        cogs = await offersApi.getOfferCOGByTitle(data?.productTitle);
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

      let salesStats = {
        earning: 0,
        orders: sales?.length,
        unitSold: 0,
        refunded: 0,
        fee: manualReversalFee,
        promo: 0,
        expenses: adCreditFee + storageFee + subscriptionFee,
        refundCost: 0,
        successFee: 0,
        fulfillmentFee: 0,
        courierCollectionFee: 0,
        autoIbtFee: 0,
        startDate: dayjs(data?.dates[i]?.start).format("DD/MM/YYYY"),
        endDate: dayjs(data?.dates[i]?.end).format("DD/MM/YYYY"),
        title: data?.dates[i]?.title,
        cogs,
        adCreditFee,
        subscriptionFee,
        storageFee,
        manualReversalFee,
      };
      // console.log("response", response.data);
      sales?.forEach((e) => {
        salesStats.earning = e?.selling_price + salesStats?.earning;
        salesStats.unitSold = salesStats?.unitSold + e?.quantity;
        salesStats.fee = salesStats?.fee + e?.total_fee;
        salesStats.successFee += e?.success_fee;
        salesStats.fulfillmentFee += e?.fulfillment_fee;
        salesStats.courierCollectionFee += e?.courier_collection_fee;
        salesStats.autoIbtFee += e?.auto_ibt_fee;
        if (
          e?.sale_status?.includes("Return") ||
          e?.sale_status?.includes("Cancel")
        ) {
          salesStats.refunded = salesStats?.refunded + e?.quantity;
          salesStats.refundCost = e?.selling_price + salesStats?.refundCost;
        }
        if (e?.promotion) {
          salesStats.promo = e?.selling_price + salesStats?.promo;
        }
      });

      // console.log("salesStats", salesStats);

      // const expenses = await expensesApi.getExpensesByDateRange({
      //   start: dayjs(data?.dates[i]?.start).format("DD MMM YYYY"),
      //   end: dayjs(data?.dates[i]?.end).format("DD MMM YYYY"),
      // });
      const expenses = await expensesApi.getExpensesByDateRangeWithByCategories(
        {
          start: dayjs(data?.dates[i]?.start).format("DD MMM YYYY"),
          end: dayjs(data?.dates[i]?.end).format("DD MMM YYYY"),
        }
      );
      expenses?.data?.forEach((expense) => {
        salesStats.expenses = salesStats.expenses + expense?.totalExpense;
      });

      salesStats["expenseCategories"] = expenses?.categoriesExpenses;

      stats[i] = salesStats;
    }
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error in [stats]:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
