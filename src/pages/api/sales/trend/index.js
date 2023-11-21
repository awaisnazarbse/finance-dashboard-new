import extractPLIDFromURL from "@/utils/extractPLIDFromUrl";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const currentYear = new Date().getFullYear();

  // const body = JSON.parse(req.body);
  try {
    const API_TOKEN =
      "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    // const API_TOKEN = body?.apiKey;

    const offersRes = await fetch(
      "https://seller-api.takealot.com/v2/offers?page_size=50&page_number=1",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      }
    );
    const response = await offersRes.json();
    const newOffers = response?.offers;
    // console.log("offers", offers);
    let data = [];

    const offers = newOffers?.filter((e) => e?.status === "Buyable");

    // const data = offers?.map(async (offer) => {
    for (let i = 0; i < offers?.length; i++) {
      let product = {
        name: offers[i]?.title,
        price: offers[i]?.selling_price,
        today: 0,
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0,
      };
      const plid = extractPLIDFromURL(offers[i]?.offer_url);
      // console.log("plid",plid);
      const productRes = await fetch(
        `https://api.takealot.com/rest/v-1-10-0/product-details/${plid}?platform=desktop`
      );
      const productResult = await productRes.json();
      // console.log("products result", productResult);
      const todayUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${
        new Date().toISOString().split("T")[0]
      },end_date:${new Date().toISOString().split("T")[0]},product_title:${
        productResult?.title
      }}`;
      const janUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-01-01,end_date:${currentYear}-01-31;product_title:${productResult?.title}}`;
      const febUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-02-01,end_date:${currentYear}-02-28;product_title:${productResult?.title}}`;
      const marUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-03-01,end_date:${currentYear}-03-31;product_title:${productResult?.title}}`;
      const aprUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-04-01,end_date:${currentYear}-04-30;product_title:${productResult?.title}}`;
      const mayUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-05-01,end_date:${currentYear}-05-31;product_title:${productResult?.title}}`;
      const junUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-06-01,end_date:${currentYear}-06-30;product_title:${productResult?.title}}`;
      const julUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-07-01,end_date:${currentYear}-07-31;product_title:${productResult?.title}}`;
      const augUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-08-01,end_date:${currentYear}-08-31;product_title:${productResult?.title}}`;
      const sepUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-09-01,end_date:${currentYear}-09-30;product_title:${productResult?.title}}`;
      const octUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-10-01,end_date:${currentYear}-10-31;product_title:${productResult?.title}}`;
      const novUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-11-01,end_date:${currentYear}-11-30;product_title:${productResult?.title}}`;
      const decUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-12-01,end_date:${currentYear}-12-31;product_title:${productResult?.title}}`;
      // const API_TOKEN = body?.apiKey;
      const todayResponse = await fetch(todayUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response1 = await fetch(janUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response2 = await fetch(febUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response3 = await fetch(marUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response4 = await fetch(aprUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response5 = await fetch(mayUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response6 = await fetch(junUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response7 = await fetch(julUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response8 = await fetch(augUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response9 = await fetch(sepUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response10 = await fetch(octUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response11 = await fetch(novUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      const response12 = await fetch(decUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });

      const today = await todayResponse.json();
      const jan = await response1.json();
      const feb = await response2.json();
      const mar = await response3.json();
      const apr = await response4.json();
      const may = await response5.json();
      const jun = await response6.json();
      const jul = await response7.json();
      const aug = await response8.json();
      const sep = await response9.json();
      const oct = await response10.json();
      const nov = await response11.json();
      const dec = await response12.json();
      // console.log("tody", today);

      // // ============Today Stats Started============
      let todayStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // const todayExpenses = await expensesApi.getExpensesByDate(
      //   dayjs().format("DD/MM/YY")
      // );
      today?.sales?.forEach((sale) => {
        todayStats.sales = todayStats?.sales + sale?.selling_price;
        // todayStats.units = todayStats?.units + sale?.quantity;
        // todayStats.fee = todayStats?.fee + sale?.total_fee;
      });

      // todayExpenses?.forEach((expense) => {
      //   todayStats.expenses = todayStats?.expenses + expense?.amount;
      // });

      // todayStats.grossProfit = todayStats?.sales - todayStats?.fee;
      // todayStats.netProfit = todayStats?.grossProfit - todayStats?.expenses;
      // todayStats.margin = (todayStats?.netProfit / todayStats?.sales) * 100;
      // // ============Today Stats Ended============

      // // ============Jan Stats Started============
      let janStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // const janExpenses = await expensesApi.getExpensesByDateRange({
      //   start: `01/01/${currentYear % 100}`,
      //   end: `01/31/${currentYear % 100}`,
      // });
      jan?.sales?.forEach((sale) => {
        janStats.sales = janStats?.sales + sale?.selling_price;
        // janStats.units = janStats?.units + sale?.quantity;
        // janStats.fee = janStats?.fee + sale?.total_fee;
      });

      // // janExpenses?.forEach((expense) => {
      // //   janStats.expenses = janStats?.expenses + expense?.amount;
      // // });

      // // janStats.grossProfit = janStats?.sales - janStats?.fee;
      // // janStats.netProfit = janStats?.grossProfit - janStats?.expenses;
      // // janStats.margin = (janStats?.netProfit / janStats?.sales) * 100;
      // // // ============Jan Stats Ended============

      // // // ============Feb Stats Started============
      let febStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // // const febExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `02/01/${currentYear % 100}`,
      // //   end: `02/29/${currentYear % 100}`,
      // // });
      feb?.sales?.forEach((sale) => {
        febStats.sales = febStats?.sales + sale?.selling_price;
        // febStats.units = febStats?.units + sale?.quantity;
        // febStats.fee = febStats?.fee + sale?.total_fee;
      });

      // // febExpenses?.forEach((expense) => {
      // //   febStats.expenses = febStats?.expenses + expense?.amount;
      // // });

      // // febStats.grossProfit = febStats?.sales - febStats?.fee;
      // // febStats.netProfit = febStats?.grossProfit - febStats?.expenses;
      // // febStats.margin = (febStats?.netProfit / febStats?.sales) * 100;
      // // // ============Feb Stats Ended============

      // // // ============Mar Stats Started============
      let marStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // // const marExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `03/01/${currentYear % 100}`,
      // //   end: `03/31/${currentYear % 100}`,
      // // });
      mar?.sales?.forEach((sale) => {
        marStats.sales = marStats?.sales + sale?.selling_price;
        // marStats.units = marStats?.units + sale?.quantity;
        // marStats.fee = marStats?.fee + sale?.total_fee;
      });

      // // marExpenses?.forEach((expense) => {
      // //   marStats.expenses = marStats?.expenses + expense?.amount;
      // // });

      // // marStats.grossProfit = marStats?.sales - marStats?.fee;
      // // marStats.netProfit = marStats?.grossProfit - marStats?.expenses;
      // // marStats.margin = (marStats?.netProfit / marStats?.sales) * 100;
      // // // ============Mar Stats Ended============

      // // // ============Apr Stats Started============
      let aprStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // // const aprExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `04/01/${currentYear % 100}`,
      // //   end: `04/30/${currentYear % 100}`,
      // // });
      apr?.sales?.forEach((sale) => {
        aprStats.sales = aprStats?.sales + sale?.selling_price;
        // aprStats.units = aprStats?.units + sale?.quantity;
        // aprStats.fee = aprStats?.fee + sale?.total_fee;
      });

      // // aprExpenses?.forEach((expense) => {
      // //   aprStats.expenses = aprStats?.expenses + expense?.amount;
      // // });

      // // aprStats.grossProfit = aprStats?.sales - aprStats?.fee;
      // // aprStats.netProfit = aprStats?.grossProfit - aprStats?.expenses;
      // // aprStats.margin = (aprStats?.netProfit / aprStats?.sales) * 100;
      // // // ============Apr Stats Ended============

      // // // ============May Stats Started============
      let mayStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // // const mayExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `05/01/${currentYear % 100}`,
      // //   end: `05/31/${currentYear % 100}`,
      // // });
      may?.sales?.forEach((sale) => {
        mayStats.sales = mayStats?.sales + sale?.selling_price;
        // mayStats.units = mayStats?.units + sale?.quantity;
        // mayStats.fee = mayStats?.fee + sale?.total_fee;
      });

      // // mayExpenses?.forEach((expense) => {
      // //   mayStats.expenses = mayStats?.expenses + expense?.amount;
      // // });

      // // mayStats.grossProfit = mayStats?.sales - mayStats?.fee;
      // // mayStats.netProfit = mayStats?.grossProfit - mayStats?.expenses;
      // // mayStats.margin = (mayStats?.netProfit / mayStats?.sales) * 100;
      // // // ============May Stats Ended============

      // // // ============Jun Stats Started============
      let junStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // // const junExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `06/01/${currentYear % 100}`,
      // //   end: `06/30/${currentYear % 100}`,
      // // });
      jun?.sales?.forEach((sale) => {
        junStats.sales = junStats?.sales + sale?.selling_price;
        // junStats.units = junStats?.units + sale?.quantity;
        // junStats.fee = junStats?.fee + sale?.total_fee;
      });

      // // junExpenses?.forEach((expense) => {
      // //   junStats.expenses = junStats?.expenses + expense?.amount;
      // // });

      // // junStats.grossProfit = junStats?.sales - junStats?.fee;
      // // junStats.netProfit = junStats?.grossProfit - junStats?.expenses;
      // // junStats.margin = (junStats?.netProfit / junStats?.sales) * 100;
      // // // ============Jun Stats Ended============

      // // // ============Jul Stats Started============
      let julStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // // const julExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `07/01/${currentYear % 100}`,
      // //   end: `07/31/${currentYear % 100}`,
      // // });
      jul?.sales?.forEach((sale) => {
        julStats.sales = julStats?.sales + sale?.selling_price;
        // julStats.units = julStats?.units + sale?.quantity;
        // julStats.fee = julStats?.fee + sale?.total_fee;
      });

      // // julExpenses?.forEach((expense) => {
      // //   julStats.expenses = julStats?.expenses + expense?.amount;
      // // });

      // // julStats.grossProfit = julStats?.sales - julStats?.fee;
      // // julStats.netProfit = julStats?.grossProfit - julStats?.expenses;
      // // julStats.margin = (julStats?.netProfit / julStats?.sales) * 100;
      // // // ============Jul Stats Ended============

      // // // ============Aug Stats Started============
      let augStats = {
        sales: 0,
        // units: 0,
        // fee: 0,
        // grossProfit: 0,
        // expenses: 0,
        // netProfit: 0,
        // margin: 0,
        // roi: 0,
      };
      // // const augExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `08/01/${currentYear % 100}`,
      // //   end: `08/31/${currentYear % 100}`,
      // // });
      aug?.sales?.forEach((sale) => {
        augStats.sales = augStats?.sales + sale?.selling_price;
        // augStats.units = augStats?.units + sale?.quantity;
        // augStats.fee = augStats?.fee + sale?.total_fee;
      });

      // // augExpenses?.forEach((expense) => {
      // //   augStats.expenses = augStats?.expenses + expense?.amount;
      // // });

      // // augStats.grossProfit = augStats?.sales - augStats?.fee;
      // // augStats.netProfit = augStats?.grossProfit - augStats?.expenses;
      // // augStats.margin = (augStats?.netProfit / augStats?.sales) * 100;
      // // // ============Aug Stats Ended============

      // // // ============Sep Stats Started============
      // let sepStats = {
      //   sales: 0,
      //   // units: 0,
      //   // fee: 0,
      //   // grossProfit: 0,
      //   // expenses: 0,
      //   // netProfit: 0,
      //   // margin: 0,
      //   // roi: 0,
      // };
      // // const sepExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `09/01/${currentYear % 100}`,
      // //   end: `09/30/${currentYear % 100}`,
      // // });
      // sep?.sales?.forEach((sale) => {
      //   sepStats.sales = sepStats?.sales + sale?.selling_price;
      //   // sepStats.units = sepStats?.units + sale?.quantity;
      //   // sepStats.fee = sepStats?.fee + sale?.total_fee;
      // });

      // // sepExpenses?.forEach((expense) => {
      // //   sepStats.expenses = sepStats?.expenses + expense?.amount;
      // // });

      // // sepStats.grossProfit = sepStats?.sales - sepStats?.fee;
      // // sepStats.netProfit = sepStats?.grossProfit - sepStats?.expenses;
      // // sepStats.margin = (sepStats?.netProfit / sepStats?.sales) * 100;
      // // // ============Sep Stats Ended============

      // // // ============Oct Stats Started============
      // let octStats = {
      //   sales: 0,
      //   // units: 0,
      //   // fee: 0,
      //   // grossProfit: 0,
      //   // expenses: 0,
      //   // netProfit: 0,
      //   // margin: 0,
      //   // roi: 0,
      // };
      // // const octExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `10/01/${currentYear % 100}`,
      // //   end: `10/31/${currentYear % 100}`,
      // // });
      // oct?.sales?.forEach((sale) => {
      //   octStats.sales = octStats?.sales + sale?.selling_price;
      //   // octStats.units = octStats?.units + sale?.quantity;
      //   // octStats.fee = octStats?.fee + sale?.total_fee;
      // });

      // // octExpenses?.forEach((expense) => {
      // //   octStats.expenses = octStats?.expenses + expense?.amount;
      // // });

      // // octStats.grossProfit = octStats?.sales - octStats?.fee;
      // // octStats.netProfit = octStats?.grossProfit - octStats?.expenses;
      // // octStats.margin = (octStats?.netProfit / octStats?.sales) * 100;
      // // // ============Oct Stats Ended============

      // // // ============Nov Stats Started============
      // let novStats = {
      //   sales: 0,
      //   // units: 0,
      //   // fee: 0,
      //   // grossProfit: 0,
      //   // expenses: 0,
      //   // netProfit: 0,
      //   // margin: 0,
      //   // roi: 0,
      // };
      // // const novExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `11/01/${currentYear % 100}`,
      // //   end: `11/30/${currentYear % 100}`,
      // // });
      // nov?.sales?.forEach((sale) => {
      //   novStats.sales = novStats?.sales + sale?.selling_price;
      //   // novStats.units = novStats?.units + sale?.quantity;
      //   // novStats.fee = novStats?.fee + sale?.total_fee;
      // });

      // // novExpenses?.forEach((expense) => {
      // //   novStats.expenses = novStats?.expenses + expense?.amount;
      // // });

      // // novStats.grossProfit = novStats?.sales - novStats?.fee;
      // // novStats.netProfit = novStats?.grossProfit - novStats?.expenses;
      // // novStats.margin = (novStats?.netProfit / novStats?.sales) * 100;
      // // // ============Nov Stats Ended============

      // // // ============Nov Stats Started============
      // let decStats = {
      //   sales: 0,
      //   // units: 0,
      //   // fee: 0,
      //   // grossProfit: 0,
      //   // expenses: 0,
      //   // netProfit: 0,
      //   // margin: 0,
      //   // roi: 0,
      // };
      // // const decExpenses = await expensesApi.getExpensesByDateRange({
      // //   start: `12/01/${currentYear % 100}`,
      // //   end: `12/31/${currentYear % 100}`,
      // // });
      // dec?.sales?.forEach((sale) => {
      //   decStats.sales = decStats?.sales + sale?.selling_price;
      //   // decStats.units = decStats?.units + sale?.quantity;
      //   // decStats.fee = decStats?.fee + sale?.total_fee;
      // });

      // decExpenses?.forEach((expense) => {
      //   decStats.expenses = decStats?.expenses + expense?.amount;
      // });

      // decStats.grossProfit = decStats?.sales - decStats?.fee;
      // decStats.netProfit = decStats?.grossProfit - decStats?.expenses;
      // decStats.margin = (decStats?.netProfit / decStats?.sales) * 100;
      // // ============Dec Stats Ended============

      product.today = todayStats?.sales;
      product.jan = janStats?.sales;
      product.feb = febStats?.sales;
      product.mar = marStats?.sales;
      product.apr = aprStats?.sales;
      product.may = mayStats?.sales;
      product.jun = junStats?.sales;
      product.jul = julStats?.sales;
      product.aug = augStats?.sales;
      // product.sep = sepStats?.sales;
      // product.oct = octStats?.sales;
      // product.nov = novStats?.sales;
      // product.dec = decStats?.sales;

      // console.log("product===", product);
      // let newData = data;
      // newData?.push(product);
      // data = newData;
      // data.push(product);
      data[i] = product;
    }
    // const count = offers?.total;
    // for (let i = 0; i <= count; i++) {
    //   if (i + 1 !== 1) {
    //     const pageOffers = await fetch(
    //       `https://seller-api.takealot.com/v2/offers?page_size=100&page_number=${
    //         i + 1
    //       }`,
    //       {
    //         method: "GET",
    //         headers: {
    //           Accept: "application/json",
    //           Authorization: `Key ${API_TOKEN}`,
    //         },
    //       }
    //     );
    //     const newOffers = await pageOffers.json();
    //     offers?.concat(newOffers?.offers);
    //   }
    // }

    // const todayUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${
    //   new Date().toISOString().split("T")[0]
    // },end_date:${new Date().toISOString().split("T")[0]}`;
    // const janUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-01-01,end_date:${currentYear}-01-31`;
    // const febUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-02-01,end_date:${currentYear}-02-28`;
    // const marUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-03-01,end_date:${currentYear}-03-31`;
    // const aprUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-04-01,end_date:${currentYear}-04-30`;
    // const mayUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-05-01,end_date:${currentYear}-05-31`;
    // const junUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-06-01,end_date:${currentYear}-06-30`;
    // const julUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-07-01,end_date:${currentYear}-07-31`;
    // const augUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-08-01,end_date:${currentYear}-08-31`;
    // const sepUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-09-01,end_date:${currentYear}-09-30`;
    // const octUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-10-01,end_date:${currentYear}-10-31`;
    // const novUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-11-01,end_date:${currentYear}-11-30`;
    // const decUrl = `https://seller-api.takealot.com/v2/sales?filters=start_date:${currentYear}-12-01,end_date:${currentYear}-12-31`;
    // const API_TOKEN = body?.apiKey;
    // const todayResponse = await fetch(todayUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response1 = await fetch(janUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response2 = await fetch(febUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response3 = await fetch(marUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response4 = await fetch(aprUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response5 = await fetch(mayUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response6 = await fetch(junUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response7 = await fetch(julUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response8 = await fetch(augUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response9 = await fetch(sepUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response10 = await fetch(octUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response11 = await fetch(novUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const response12 = await fetch(decUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });

    // const today = await todayResponse.json();
    // const jan = await response1.json();
    // const feb = await response2.json();
    // const mar = await response3.json();
    // const apr = await response4.json();
    // const may = await response5.json();
    // const jun = await response6.json();
    // const jul = await response7.json();
    // const aug = await response8.json();
    // const sep = await response9.json();
    // const oct = await response10.json();
    // const nov = await response11.json();
    // const dec = await response12.json();

    // // ============Today Stats Started============
    // let todayStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const todayExpenses = await expensesApi.getExpensesByDate(
    //   dayjs().format("DD/MM/YY")
    // );
    // today?.sales?.forEach((sale) => {
    //   todayStats.sales = todayStats?.sales + sale?.selling_price;
    //   todayStats.units = todayStats?.units + sale?.quantity;
    //   todayStats.fee = todayStats?.fee + sale?.total_fee;
    // });

    // todayExpenses?.forEach((expense) => {
    //   todayStats.expenses = todayStats?.expenses + expense?.amount;
    // });

    // todayStats.grossProfit = todayStats?.sales - todayStats?.fee;
    // todayStats.netProfit = todayStats?.grossProfit - todayStats?.expenses;
    // todayStats.margin = (todayStats?.netProfit / todayStats?.sales) * 100;
    // // ============Today Stats Ended============

    // // ============Jan Stats Started============
    // let janStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const janExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `01/01/${currentYear % 100}`,
    //   end: `01/31/${currentYear % 100}`,
    // });
    // jan?.sales?.forEach((sale) => {
    //   janStats.sales = janStats?.sales + sale?.selling_price;
    //   janStats.units = janStats?.units + sale?.quantity;
    //   janStats.fee = janStats?.fee + sale?.total_fee;
    // });

    // janExpenses?.forEach((expense) => {
    //   janStats.expenses = janStats?.expenses + expense?.amount;
    // });

    // janStats.grossProfit = janStats?.sales - janStats?.fee;
    // janStats.netProfit = janStats?.grossProfit - janStats?.expenses;
    // janStats.margin = (janStats?.netProfit / janStats?.sales) * 100;
    // // ============Jan Stats Ended============

    // // ============Feb Stats Started============
    // let febStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const febExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `02/01/${currentYear % 100}`,
    //   end: `02/29/${currentYear % 100}`,
    // });
    // feb?.sales?.forEach((sale) => {
    //   febStats.sales = febStats?.sales + sale?.selling_price;
    //   febStats.units = febStats?.units + sale?.quantity;
    //   febStats.fee = febStats?.fee + sale?.total_fee;
    // });

    // febExpenses?.forEach((expense) => {
    //   febStats.expenses = febStats?.expenses + expense?.amount;
    // });

    // febStats.grossProfit = febStats?.sales - febStats?.fee;
    // febStats.netProfit = febStats?.grossProfit - febStats?.expenses;
    // febStats.margin = (febStats?.netProfit / febStats?.sales) * 100;
    // // ============Feb Stats Ended============

    // // ============Mar Stats Started============
    // let marStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const marExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `03/01/${currentYear % 100}`,
    //   end: `03/31/${currentYear % 100}`,
    // });
    // mar?.sales?.forEach((sale) => {
    //   marStats.sales = marStats?.sales + sale?.selling_price;
    //   marStats.units = marStats?.units + sale?.quantity;
    //   marStats.fee = marStats?.fee + sale?.total_fee;
    // });

    // marExpenses?.forEach((expense) => {
    //   marStats.expenses = marStats?.expenses + expense?.amount;
    // });

    // marStats.grossProfit = marStats?.sales - marStats?.fee;
    // marStats.netProfit = marStats?.grossProfit - marStats?.expenses;
    // marStats.margin = (marStats?.netProfit / marStats?.sales) * 100;
    // // ============Mar Stats Ended============

    // // ============Apr Stats Started============
    // let aprStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const aprExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `04/01/${currentYear % 100}`,
    //   end: `04/30/${currentYear % 100}`,
    // });
    // apr?.sales?.forEach((sale) => {
    //   aprStats.sales = aprStats?.sales + sale?.selling_price;
    //   aprStats.units = aprStats?.units + sale?.quantity;
    //   aprStats.fee = aprStats?.fee + sale?.total_fee;
    // });

    // aprExpenses?.forEach((expense) => {
    //   aprStats.expenses = aprStats?.expenses + expense?.amount;
    // });

    // aprStats.grossProfit = aprStats?.sales - aprStats?.fee;
    // aprStats.netProfit = aprStats?.grossProfit - aprStats?.expenses;
    // aprStats.margin = (aprStats?.netProfit / aprStats?.sales) * 100;
    // // ============Apr Stats Ended============

    // // ============May Stats Started============
    // let mayStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const mayExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `05/01/${currentYear % 100}`,
    //   end: `05/31/${currentYear % 100}`,
    // });
    // may?.sales?.forEach((sale) => {
    //   mayStats.sales = mayStats?.sales + sale?.selling_price;
    //   mayStats.units = mayStats?.units + sale?.quantity;
    //   mayStats.fee = mayStats?.fee + sale?.total_fee;
    // });

    // mayExpenses?.forEach((expense) => {
    //   mayStats.expenses = mayStats?.expenses + expense?.amount;
    // });

    // mayStats.grossProfit = mayStats?.sales - mayStats?.fee;
    // mayStats.netProfit = mayStats?.grossProfit - mayStats?.expenses;
    // mayStats.margin = (mayStats?.netProfit / mayStats?.sales) * 100;
    // // ============May Stats Ended============

    // // ============Jun Stats Started============
    // let junStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const junExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `06/01/${currentYear % 100}`,
    //   end: `06/30/${currentYear % 100}`,
    // });
    // jun?.sales?.forEach((sale) => {
    //   junStats.sales = junStats?.sales + sale?.selling_price;
    //   junStats.units = junStats?.units + sale?.quantity;
    //   junStats.fee = junStats?.fee + sale?.total_fee;
    // });

    // junExpenses?.forEach((expense) => {
    //   junStats.expenses = junStats?.expenses + expense?.amount;
    // });

    // junStats.grossProfit = junStats?.sales - junStats?.fee;
    // junStats.netProfit = junStats?.grossProfit - junStats?.expenses;
    // junStats.margin = (junStats?.netProfit / junStats?.sales) * 100;
    // // ============Jun Stats Ended============

    // // ============Jul Stats Started============
    // let julStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const julExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `07/01/${currentYear % 100}`,
    //   end: `07/31/${currentYear % 100}`,
    // });
    // jul?.sales?.forEach((sale) => {
    //   julStats.sales = julStats?.sales + sale?.selling_price;
    //   julStats.units = julStats?.units + sale?.quantity;
    //   julStats.fee = julStats?.fee + sale?.total_fee;
    // });

    // julExpenses?.forEach((expense) => {
    //   julStats.expenses = julStats?.expenses + expense?.amount;
    // });

    // julStats.grossProfit = julStats?.sales - julStats?.fee;
    // julStats.netProfit = julStats?.grossProfit - julStats?.expenses;
    // julStats.margin = (julStats?.netProfit / julStats?.sales) * 100;
    // // ============Jul Stats Ended============

    // // ============Aug Stats Started============
    // let augStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const augExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `08/01/${currentYear % 100}`,
    //   end: `08/31/${currentYear % 100}`,
    // });
    // aug?.sales?.forEach((sale) => {
    //   augStats.sales = augStats?.sales + sale?.selling_price;
    //   augStats.units = augStats?.units + sale?.quantity;
    //   augStats.fee = augStats?.fee + sale?.total_fee;
    // });

    // augExpenses?.forEach((expense) => {
    //   augStats.expenses = augStats?.expenses + expense?.amount;
    // });

    // augStats.grossProfit = augStats?.sales - augStats?.fee;
    // augStats.netProfit = augStats?.grossProfit - augStats?.expenses;
    // augStats.margin = (augStats?.netProfit / augStats?.sales) * 100;
    // // ============Aug Stats Ended============

    // // ============Sep Stats Started============
    // let sepStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const sepExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `09/01/${currentYear % 100}`,
    //   end: `09/30/${currentYear % 100}`,
    // });
    // sep?.sales?.forEach((sale) => {
    //   sepStats.sales = sepStats?.sales + sale?.selling_price;
    //   sepStats.units = sepStats?.units + sale?.quantity;
    //   sepStats.fee = sepStats?.fee + sale?.total_fee;
    // });

    // sepExpenses?.forEach((expense) => {
    //   sepStats.expenses = sepStats?.expenses + expense?.amount;
    // });

    // sepStats.grossProfit = sepStats?.sales - sepStats?.fee;
    // sepStats.netProfit = sepStats?.grossProfit - sepStats?.expenses;
    // sepStats.margin = (sepStats?.netProfit / sepStats?.sales) * 100;
    // // ============Sep Stats Ended============

    // // ============Oct Stats Started============
    // let octStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const octExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `10/01/${currentYear % 100}`,
    //   end: `10/31/${currentYear % 100}`,
    // });
    // oct?.sales?.forEach((sale) => {
    //   octStats.sales = octStats?.sales + sale?.selling_price;
    //   octStats.units = octStats?.units + sale?.quantity;
    //   octStats.fee = octStats?.fee + sale?.total_fee;
    // });

    // octExpenses?.forEach((expense) => {
    //   octStats.expenses = octStats?.expenses + expense?.amount;
    // });

    // octStats.grossProfit = octStats?.sales - octStats?.fee;
    // octStats.netProfit = octStats?.grossProfit - octStats?.expenses;
    // octStats.margin = (octStats?.netProfit / octStats?.sales) * 100;
    // // ============Oct Stats Ended============

    // // ============Nov Stats Started============
    // let novStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const novExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `11/01/${currentYear % 100}`,
    //   end: `11/30/${currentYear % 100}`,
    // });
    // nov?.sales?.forEach((sale) => {
    //   novStats.sales = novStats?.sales + sale?.selling_price;
    //   novStats.units = novStats?.units + sale?.quantity;
    //   novStats.fee = novStats?.fee + sale?.total_fee;
    // });

    // novExpenses?.forEach((expense) => {
    //   novStats.expenses = novStats?.expenses + expense?.amount;
    // });

    // novStats.grossProfit = novStats?.sales - novStats?.fee;
    // novStats.netProfit = novStats?.grossProfit - novStats?.expenses;
    // novStats.margin = (novStats?.netProfit / novStats?.sales) * 100;
    // // ============Nov Stats Ended============

    // // ============Nov Stats Started============
    // let decStats = {
    //   sales: 0,
    //   units: 0,
    //   fee: 0,
    //   grossProfit: 0,
    //   expenses: 0,
    //   netProfit: 0,
    //   margin: 0,
    //   roi: 0,
    // };
    // const decExpenses = await expensesApi.getExpensesByDateRange({
    //   start: `12/01/${currentYear % 100}`,
    //   end: `12/31/${currentYear % 100}`,
    // });
    // dec?.sales?.forEach((sale) => {
    //   decStats.sales = decStats?.sales + sale?.selling_price;
    //   decStats.units = decStats?.units + sale?.quantity;
    //   decStats.fee = decStats?.fee + sale?.total_fee;
    // });

    // decExpenses?.forEach((expense) => {
    //   decStats.expenses = decStats?.expenses + expense?.amount;
    // });

    // decStats.grossProfit = decStats?.sales - decStats?.fee;
    // decStats.netProfit = decStats?.grossProfit - decStats?.expenses;
    // decStats.margin = (decStats?.netProfit / decStats?.sales) * 100;
    // // ============Dec Stats Ended============

    // // let rev = [];
    // // let allMonths = [
    // //   jan,
    // //   feb,
    // //   mar,
    // //   apr,
    // //   may,
    // //   jun,
    // //   jul,
    // //   aug,
    // //   sep,
    // //   oct,
    // //   nov,
    // //   dec,
    // // ];
    // // allMonths.forEach((monthlySale) => {
    // //   let newRev = 0;
    // //   if (monthlySale?.sales?.length > 0) {
    // //     monthlySale?.sales?.forEach(
    // //       (e) => (newRev = newRev + e?.selling_price)
    // //     );
    // //     rev.push(newRev);
    // //   } else {
    // //     rev.push(newRev);
    // //   }
    // // });
    // const data = [
    //   {
    //     parameter: "Sales",
    //     today: `R ${todayStats.sales?.toFixed(2)}`,
    //     jan: `R ${janStats?.sales?.toFixed(2)}`,
    //     feb: `R ${febStats?.sales?.toFixed(2)}`,
    //     mar: `R ${marStats?.sales?.toFixed(2)}`,
    //     apr: `R ${aprStats?.sales?.toFixed(2)}`,
    //     may: `R ${mayStats?.sales?.toFixed(2)}`,
    //     jun: `R ${junStats?.sales?.toFixed(2)}`,
    //     jul: `R ${julStats?.sales?.toFixed(2)}`,
    //     aug: `R ${augStats?.sales?.toFixed(2)}`,
    //     sep: `R ${sepStats?.sales?.toFixed(2)}`,
    //     oct: `R ${octStats?.sales?.toFixed(2)}`,
    //     nov: `R ${novStats?.sales?.toFixed(2)}`,
    //     dec: `R ${decStats?.sales?.toFixed(2)}`,
    //   },
    //   {
    //     parameter: "Unit Sold",
    //     today: todayStats.units,
    //     jan: janStats.units,
    //     feb: febStats.units,
    //     mar: marStats.units,
    //     apr: aprStats.units,
    //     may: mayStats.units,
    //     jun: junStats.units,
    //     jul: julStats.units,
    //     aug: augStats.units,
    //     sep: sepStats.units,
    //     oct: octStats.units,
    //     nov: novStats.units,
    //     dec: decStats.units,
    //   },
    //   {
    //     parameter: "Refund",
    //     today: "-",
    //     jan: "-",
    //     feb: "-",
    //     mar: "-",
    //     apr: "-",
    //     may: "-",
    //     jun: "-",
    //     jul: "-",
    //     aug: "-",
    //     sep: "-",
    //     oct: "-",
    //     nov: "-",
    //     dec: "-",
    //   },
    //   {
    //     parameter: "Promo",
    //     today: "-",
    //     jan: "-",
    //     feb: "-",
    //     mar: "-",
    //     apr: "-",
    //     may: "-",
    //     jun: "-",
    //     jul: "-",
    //     aug: "-",
    //     sep: "-",
    //     oct: "-",
    //     nov: "-",
    //     dec: "-",
    //   },
    //   {
    //     parameter: "Advertising Cost",
    //     today: "-",
    //     jan: "-",
    //     feb: "-",
    //     mar: "-",
    //     apr: "-",
    //     may: "-",
    //     jun: "-",
    //     jul: "-",
    //     aug: "-",
    //     sep: "-",
    //     oct: "-",
    //     nov: "-",
    //     dec: "-",
    //   },
    //   {
    //     parameter: "Estimated Payout",
    //     today: "-",
    //     jan: "-",
    //     feb: "-",
    //     mar: "-",
    //     apr: "-",
    //     may: "-",
    //     jun: "-",
    //     jul: "-",
    //     aug: "-",
    //     sep: "-",
    //     oct: "-",
    //     nov: "-",
    //     dec: "-",
    //   },
    //   {
    //     parameter: "Cost of Goods",
    //     today: "-",
    //     jan: "-",
    //     feb: "-",
    //     mar: "-",
    //     apr: "-",
    //     may: "-",
    //     jun: "-",
    //     jul: "-",
    //     aug: "-",
    //     sep: "-",
    //     oct: "-",
    //     nov: "-",
    //     dec: "-",
    //   },
    //   {
    //     parameter: "Takealot Fee",
    //     today: `R ${todayStats?.fee?.toFixed(2)}`,
    //     jan: `R ${janStats?.fee?.toFixed(2)}`,
    //     feb: `R ${febStats?.fee?.toFixed(2)}`,
    //     mar: `R ${marStats?.fee?.toFixed(2)}`,
    //     apr: `R ${aprStats?.fee?.toFixed(2)}`,
    //     may: `R ${mayStats?.fee?.toFixed(2)}`,
    //     jun: `R ${junStats?.fee?.toFixed(2)}`,
    //     jul: `R ${julStats?.fee?.toFixed(2)}`,
    //     aug: `R ${augStats?.fee?.toFixed(2)}`,
    //     sep: `R ${sepStats?.fee?.toFixed(2)}`,
    //     oct: `R ${octStats?.fee?.toFixed(2)}`,
    //     nov: `R ${novStats?.fee?.toFixed(2)}`,
    //     dec: `R ${decStats?.fee?.toFixed(2)}`,
    //   },
    //   {
    //     parameter: "Gross Profit",
    //     today: `R ${todayStats.grossProfit?.toFixed(2)}`,
    //     jan: `R ${janStats.grossProfit?.toFixed(2)}`,
    //     feb: `R ${febStats.grossProfit?.toFixed(2)}`,
    //     mar: `R ${marStats.grossProfit?.toFixed(2)}`,
    //     apr: `R ${aprStats.grossProfit?.toFixed(2)}`,
    //     may: `R ${mayStats.grossProfit?.toFixed(2)}`,
    //     jun: `R ${junStats.grossProfit?.toFixed(2)}`,
    //     jul: `R ${julStats.grossProfit?.toFixed(2)}`,
    //     aug: `R ${augStats.grossProfit?.toFixed(2)}`,
    //     sep: `R ${sepStats.grossProfit?.toFixed(2)}`,
    //     oct: `R ${octStats.grossProfit?.toFixed(2)}`,
    //     nov: `R ${novStats.grossProfit?.toFixed(2)}`,
    //     dec: `R ${decStats.grossProfit?.toFixed(2)}`,
    //   },
    //   {
    //     parameter: "Expenses",
    //     today: `R ${todayStats?.expenses?.toFixed(2)}`,
    //     jan: `R ${janStats?.expenses?.toFixed(2)}`,
    //     feb: `R ${febStats?.expenses?.toFixed(2)}`,
    //     mar: `R ${marStats?.expenses?.toFixed(2)}`,
    //     apr: `R ${aprStats?.expenses?.toFixed(2)}`,
    //     may: `R ${mayStats?.expenses?.toFixed(2)}`,
    //     jun: `R ${junStats?.expenses?.toFixed(2)}`,
    //     jul: `R ${julStats?.expenses?.toFixed(2)}`,
    //     aug: `R ${augStats?.expenses?.toFixed(2)}`,
    //     sep: `R ${sepStats?.expenses?.toFixed(2)}`,
    //     oct: `R ${octStats?.expenses?.toFixed(2)}`,
    //     nov: `R ${novStats?.expenses?.toFixed(2)}`,
    //     dec: `R ${decStats?.expenses?.toFixed(2)}`,
    //   },
    //   {
    //     parameter: "Net Profit",
    //     today: `R ${todayStats.netProfit?.toFixed(2)}`,
    //     jan: `R ${janStats?.netProfit?.toFixed(2)}`,
    //     feb: `R ${febStats?.netProfit?.toFixed(2)}`,
    //     mar: `R ${marStats?.netProfit?.toFixed(2)}`,
    //     apr: `R ${aprStats?.netProfit?.toFixed(2)}`,
    //     may: `R ${mayStats?.netProfit?.toFixed(2)}`,
    //     jun: `R ${junStats?.netProfit?.toFixed(2)}`,
    //     jul: `R ${julStats?.netProfit?.toFixed(2)}`,
    //     aug: `R ${augStats?.netProfit?.toFixed(2)}`,
    //     sep: `R ${sepStats?.netProfit?.toFixed(2)}`,
    //     oct: `R ${octStats?.netProfit?.toFixed(2)}`,
    //     nov: `R ${novStats?.netProfit?.toFixed(2)}`,
    //     dec: `R ${decStats?.netProfit?.toFixed(2)}`,
    //   },
    //   {
    //     parameter: "Margin",
    //     today: `${todayStats.margin?.toFixed(2)}%`,
    //     jan: `${janStats.margin?.toFixed(2)}%`,
    //     feb: `${febStats.margin?.toFixed(2)}%`,
    //     mar: `${marStats.margin?.toFixed(2)}%`,
    //     apr: `${aprStats.margin?.toFixed(2)}%`,
    //     may: `${mayStats.margin?.toFixed(2)}%`,
    //     jun: `${junStats.margin?.toFixed(2)}%`,
    //     jul: `${julStats.margin?.toFixed(2)}%`,
    //     aug: `${augStats.margin?.toFixed(2)}%`,
    //     sep: `${sepStats.margin?.toFixed(2)}%`,
    //     oct: `${octStats.margin?.toFixed(2)}%`,
    //     nov: `${novStats.margin?.toFixed(2)}%`,
    //     dec: `${decStats.margin?.toFixed(2)}%`,
    //   },
    //   {
    //     parameter: "ROI",
    //     today: "-",
    //     jan: "-",
    //     feb: "-",
    //     mar: "-",
    //     apr: "-",
    //     may: "-",
    //     jun: "-",
    //     jul: "-",
    //     aug: "-",
    //     sep: "-",
    //     oct: "-",
    //     nov: "-",
    //     dec: "-",
    //   },
    // ];
    // console.log("data in api", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from the API." });
  }
}
