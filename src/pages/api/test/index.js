import getAllSales from "@/utils/getAllSales";
import axios from "axios";
import dayjs from "dayjs";
import fetch from "node-fetch";

export default async function handler(req, res) {
  //   const body = JSON.parse(req.body);
  try {
    // const apiUrl =
    //   "https://ess-api.co.za/api/takealot/sales?start_date=2020-06-03&end_date=2020-07-08&page_size=100&page_number=1";
    // const API_TOKEN =
    //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";

    // const offersResponse = await fetch(
    //   "https://ess-api.co.za/api/takealot/sales?start_date=2020-06-03&end_date=2020-07-08&page_size=100&page_number=1",
    //   {
    //     method: "GET",
    //     headers: [
    //       {
    // 				"key": "api-key",
    // 				"value": API_TOKEN,
    // 				"type": "text"
    // 			},
    // 			{
    // 				"key": "start-date",
    // 				"value": "2020-06-03",
    // 				"type": "text",
    // 				"disabled": true
    // 			},
    // 			{
    // 				"key": "end-date",
    // 				"value": "2020-07-08",
    // 				"type": "text",
    // 				"disabled": true
    // 			},
    // 			{
    // 				"key": "page_size",
    // 				"value": "100",
    // 				"type": "text",
    // 				"disabled": true
    // 			}
    //     ],
    //   }
    // );

    // const offers = await offersResponse.json();

    // console.log("offers", offers);

    // const API_TOKEN =
    //   "02e619cdd10629f02105ebedfd8bbfe12a8d634be46cce7d7df805633a95f6b411a0bee84a6ab4babe3f99d0446590de54003cdc8c25922d14f1e3f4690a402a";
    const API_TOKEN =
      "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    const startDate = "2023-11-01";
    const endDate = "2023-11-19";
    const pageSize = "100";
    const pageNumber = "1";
    let url = `https://seller-api.takealot.com/v2/sales?page_number=1&page_size=1&filters=start_date:${startDate},end_date:${endDate}`;
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_TOKEN}`,
      },
    });
    let sales = [];
    let salesByPages = {};
    const totalPages = Math.ceil(response.data?.page_summary?.total / 100) || 0;
    console.log("total pages", totalPages);
    for (let i = 1; i <= totalPages; i++) {
      let url = `https://seller-api.takealot.com/v2/sales?page_number=${i}&page_size=100&filters=start_date:${startDate},end_date:${endDate}`;
      const res = await axios.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Key ${API_TOKEN}`,
        },
      });
      salesByPages[i] = res.data.sales?.length;
      if (i <= totalPages) {
        sales = sales.concat(res.data.sales);
      }
    }

    let totalRevenue = 0;

    sales?.forEach((e) => {
      if (
        e?.sale_status !== "Cancelled by Customer" &&
        e?.sale_status !== "Cancelled by Takealot" &&
        e?.sale_status !== "Cancelled by Seller" &&
        e?.sale_status !== "Cancelled - Late Delivery" &&
        e?.sale_status !== "Cancelled - Inbound Exception"
      ) {
        totalRevenue += e?.selling_price;
      }
    });

    const final = {
      sales,
      page_summary: response.data?.page_summary,
      actualSalesLength: sales.length,
      totalRevenue,
      salesByPages,
    };
    // const sales = await getAllSales(startDate, endDate, API_TOKEN, true);
    // https://seller-api.takealot.com/v1/shipments?shipment_state=3&get_instruction_data=true
    // https://seller-api.takealot.com/v1/shipment/2787527/shipment_items?get_po_data=true
    // https://seller-api.takealot.com/v2/shipment/facilities
    // const apiUrl = `https://seller-api.takealot.com/v2/notifications`;

    // const response = await axios.get(apiUrl, {
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const data = await getAllSales(null, null, API_TOKEN, false);

    // console.log("API response:", response.data);

    // const response = await fetch(apiUrl, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Key ${API_TOKEN}`,
    //   },
    // });
    // const data = await response.json();
    // let finalOffers = [];
    // await Promise.all(
    //   offers?.offers?.map(async (offer) => {
    //     // let product = null;
    //     // if (!offer?.status?.includes("Disable")) {
    //     //   const plid = extractPLIDFromURL(offer?.offer_url);
    //     //   const productRes = await fetch(
    //     //     `https://api.takealot.com/rest/v-1-10-0/product-details/${plid}?platform=desktop`
    //     //   );
    //     //   product = await productRes.json();
    //     // }
    //     // if (product) {
    //     //   finalOffers.push({ ...offer, ...product });
    //     // } else {
    //     //   finalOffers.push(offer);
    //     // }
    //     const response = await fetch(
    //       `https://seller-api.takealot.com/v2/sales?filters=product_title:${offer?.title}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           Accept: "application/json",
    //           Authorization: `Key ${API_TOKEN}`,
    //         },
    //       }
    //     );
    //     const data = await response.json();
    //     finalOffers.push(data?.sales);
    //   })
    // );
    // let finalData = [];
    // await Promise.all(
    //   finalOffers?.map((e) => {
    //     if (e?.length > 0) {
    //       let data = {
    //         product: e[0]?.product_title,
    //         unitSold: 0,
    //         fee: 0,
    //         sales: 0,
    //       };

    //       e?.forEach((e) => {
    //         data.fee = data?.fee + e?.total_fee;
    //         data.sales = data?.sales + e?.selling_price;
    //         data.unitSold = data?.unitSold + e?.quantity;
    //       });

    //       finalData.push(data);
    //     }
    //   })
    // );
    // // console.log("data", data);
    res.status(200).json(final);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error?.message,
    });
  }
}
