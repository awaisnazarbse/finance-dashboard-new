import expensesApi from "@/lib/expense";
import offersApi from "@/lib/offers";
import userApi from "@/lib/user";
import getAllSalesByProduct from "@/utils/getAllSalesByProduct";
import getAllSalesNew from "@/utils/getAllSalesNew";
import getCog from "@/utils/getCog";
import dayjs from "dayjs";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  try {
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
            let newSales = first6MonthsSales.concat(second6MonthsSales);
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

          data = first6MonthsSales?.concat(second6MonthsSales);
        }
      } else {
        if (body?.marketplace === "All market places") {
          const userApiKeys = await userApi.getActiveUserAPIKeys(body?.uid);
          for (let it = 0; it < userApiKeys?.length; it++) {
            let newSales = await getAllSalesNew(
              dayjs(body?.startDate).format("YYYY-MM-DD"),
              dayjs(body?.endDate).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey
            );
            data = data?.concat(newSales);
          }
        } else {
          data = await getAllSalesNew(
            dayjs(body?.startDate).format("YYYY-MM-DD"),
            dayjs(body?.endDate).format("YYYY-MM-DD"),
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
      let cogs = await getCog(offerIds);
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
      if (expenses?.data?.length > 0) {
        Promise.all(
          expenses?.data?.map((expense) => {
            totalExpenses = totalExpenses + expense?.totalExpense;
          })
        );
      }
      Promise.all(
        data?.map((sale) => {
          if (
            sale?.sale_status !== "Cancelled by Customer" &&
            sale?.sale_status !== "Cancelled by Takealot"
          ) {
            sales += sale?.selling_price;
            units += sale?.quantity;
          }
          if (sale?.promotion) {
            promo += sale?.selling_price;
          }
          if (sale?.sale_status === "Returned") {
            returnCost += sale?.selling_price;
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
        fee,
        totalReturnedUnits,
        totalExpenses,
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
              dayjs(body?.startDate).format("YYYY-MM-DD"),
              dayjs(body?.endDate).format("YYYY-MM-DD"),
              userApiKeys[it]?.apiKey,
              true,
              body?.productTitle
            );

            data = data?.concat(newSales);
          }
        } else {
          data = await getAllSalesByProduct(
            dayjs(body?.startDate).format("YYYY-MM-DD"),
            dayjs(body?.endDate).format("YYYY-MM-DD"),
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
            sale?.sale_status !== "Cancelled by Customer" &&
            sale?.sale_status !== "Cancelled by Takealot"
          ) {
            sales += sale?.selling_price;
            units += sale?.quantity;
          }
          if (sale?.promotion) {
            promo += sale?.selling_price;
          }
          if (sale?.sale_status === "Returned") {
            returnCost += sale?.selling_price;
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
        fee,
        totalReturnedUnits,
        totalExpenses,
        successFee,
        fulfillmentFee,
        autoIbtFee,
        courierCollectionFee,
        expenseCategories: expenses?.categoriesExpenses,
        cogs,
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
