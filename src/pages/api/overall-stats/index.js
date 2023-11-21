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
    let cogs = 0;
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

            sales = first6MonthsSales?.concat(second6MonthsSales);
          } else {
            sales = await getAllSalesNew(
              dayjs(body?.startDate).format("YYYY-MM-DD"),
              dayjs(body?.endDate).format("YYYY-MM-DD"),
              userApis[it]?.apiKey
            );
          }
          sales?.forEach((e) => {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              totalRevenue += e?.selling_price;
              unitSold += e?.quantity;
            }
            takealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              returnTotal += e?.quantity;
              returnCost += e?.selling_price;
            }
            console.log("dc..", e?.dc);
            if (e?.dc === "JHB") {
              if (
                e?.sale_status !== "Cancelled by Customer" &&
                e?.sale_status !== "Cancelled by Takealot"
              ) {
                jhbRevenue += e?.selling_price;
                jhbUnitSold += e?.quantity;
              }
              jhbTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                jhbReturnTotal += e?.quantity;
                jhbReturnCost += e?.selling_price;
              }
            }

            if (e?.dc === "CPT") {
              if (
                e?.sale_status !== "Cancelled by Customer" &&
                e?.sale_status !== "Cancelled by Takealot"
              ) {
                cptRevenue += e?.selling_price;
                cptUnitSold += e?.quantity;
              }
              cptTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                cptReturnTotal += e?.quantity;
                cptReturnCost += e?.selling_price;
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
              dayjs(body?.startDate).format("YYYY-MM-DD"),
              dayjs(body?.endDate).format("YYYY-MM-DD"),
              userApis[it]?.apiKey,
              true,
              body?.productTitle
            );
          }

          sales?.forEach((e) => {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              totalRevenue += e?.selling_price;
              unitSold += e?.quantity;
            }
            takealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              returnTotal += e?.quantity;
              returnCost += e?.selling_price;
            }
            if (e?.dc === "JHB") {
              if (
                e?.sale_status !== "Cancelled by Customer" &&
                e?.sale_status !== "Cancelled by Takealot"
              ) {
                jhbRevenue += e?.selling_price;
                jhbUnitSold += e?.quantity;
              }
              jhbTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                jhbReturnTotal += e?.quantity;
                jhbReturnCost += e?.selling_price;
              }
            }

            if (e?.dc === "CPT") {
              if (
                e?.sale_status !== "Cancelled by Customer" &&
                e?.sale_status !== "Cancelled by Takealot"
              ) {
                cptRevenue += e?.selling_price;
                cptUnitSold += e?.quantity;
              }
              cptTakealotFee += e?.total_fee;
              if (e?.sale_status === "Returned") {
                cptReturnTotal += e?.quantity;
                cptReturnCost += e?.selling_price;
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

      res.status(200).json({
        totalRevenue,
        takealotFee,
        unitSold,
        totalExpenses,
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
            API_TOKEN
          );
          let second6MonthsSales = await getAllSalesNew(
            dayjs(second6MonthsStart).format("YYYY-MM-DD"),
            dayjs(second6MonthsEnd).format("YYYY-MM-DD"),
            API_TOKEN
          );

          sales = first6MonthsSales?.concat(second6MonthsSales);
        } else {
          console.log(
            "start date chart view cards:",
            dayjs(body?.startDate).format("YYYY-MM-DD")
          );
          console.log(
            "end date chart view cards:",
            dayjs(body?.endDate).format("YYYY-MM-DD")
          );
          sales = await getAllSalesNew(
            dayjs(body?.startDate).add(1, "day").format("YYYY-MM-DD"),
            dayjs(body?.endDate).format("YYYY-MM-DD"),
            API_TOKEN
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
            e?.sale_status !== "Cancelled by Customer" &&
            e?.sale_status !== "Cancelled by Takealot"
          ) {
            totalRevenue += e?.selling_price;
            unitSold += e?.quantity;
          }
          takealotFee += e?.total_fee;
          if (e?.sale_status === "Returned") {
            // console.log("return total", e?.selling_price);
            returnTotal += e?.quantity;
            returnCost += e?.selling_price;
          }
          if (e?.dc === "JHB") {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              jhbRevenue += e?.selling_price;
              jhbUnitSold += e?.quantity;
            }
            jhbTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              // console.log("return dc", e?.selling_price);

              jhbReturnTotal += e?.quantity;
              jhbReturnCost += e?.selling_price;
            }
          }

          if (e?.dc === "CPT") {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              cptRevenue += e?.selling_price;
              cptUnitSold += e?.quantity;
            }
            cptTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              // console.log("return dc", e?.selling_price);
              cptReturnTotal += e?.quantity;
              cptReturnCost += e?.selling_price;
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
        // if (offerIds.length > 0) {
        //   cogs = await offersApi.getOfferCOGsByOfferIds(offerIds);
        // }
        cogs = await getCog(offerIds);
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
        res.status(200).json({
          totalRevenue,
          takealotFee,
          unitSold,
          totalExpenses,
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
            dayjs(body?.startDate).format("YYYY-MM-DD"),
            dayjs(body?.endDate).format("YYYY-MM-DD"),
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
            e?.sale_status !== "Cancelled by Customer" &&
            e?.sale_status !== "Cancelled by Takealot"
          ) {
            totalRevenue += e?.selling_price;
            unitSold += e?.quantity;
          }
          takealotFee += e?.total_fee;
          if (e?.sale_status === "Returned") {
            returnTotal += e?.quantity;
            returnCost += e?.selling_price;
          }
          if (e?.dc === "JHB") {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              jhbRevenue += e?.selling_price;
              jhbUnitSold += e?.quantity;
            }
            jhbTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              jhbReturnTotal += e?.quantity;
              jhbReturnCost += e?.selling_price;
            }
          }

          if (e?.dc === "CPT") {
            if (
              e?.sale_status !== "Cancelled by Customer" &&
              e?.sale_status !== "Cancelled by Takealot"
            ) {
              cptRevenue += e?.selling_price;
              cptUnitSold += e?.quantity;
            }
            cptTakealotFee += e?.total_fee;
            if (e?.sale_status === "Returned") {
              cptReturnTotal += e?.quantity;
              cptReturnCost += e?.selling_price;
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

        res.status(200).json({
          totalRevenue,
          takealotFee,
          unitSold,
          totalExpenses,
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
        });
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
