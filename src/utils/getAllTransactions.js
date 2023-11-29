// import axios from "axios";

// export default async function getAllTransactions(
//   startDate,
//   endDate,
//   API_TOKEN,
//   range = true
// ) {
//   // console.log("tran data",{startDate, endDate,API_TOKEN})
//   const maxRetries = 5;
//   const retryDelay = 1000;
//   const pageSize = 100;
//   let allSales = [];
//   let pageNumber = 1;

//   const totalPages = await getTotalPages(startDate, endDate, API_TOKEN, range);
//   console.log("totalPages",totalPages)
//   if (totalPages === 0) {
//     return allSales;
//   }

//   const fetchPage = async (pageNumber) => {
//     try {
//       const response = await fetchSalesData(
//         pageNumber,
//         startDate,
//         endDate,
//         API_TOKEN,
//         range
//       );
//       return response?.transactions || [];
//     } catch (error) {
//       if (maxRetries > 0 && error.response && error.response.status === 429) {
//         console.log(
//           `Rate limited. Retrying in ${retryDelay / 1000} seconds...`
//         );
//         await new Promise((resolve) => setTimeout(resolve, retryDelay));
//         return fetchPage(pageNumber);
//       } else {
//         throw error;
//       }
//     }
//   };

//   const promises = Array.from({ length: totalPages }, (_, i) =>
//     fetchPage(pageNumber + i)
//   );
//   const pageResults = await Promise.all(promises);

//   return pageResults.flat();
// }

// async function getTotalPages(startDate, endDate, API_TOKEN, range) {
//   // console.log("pages res", {startDate, endDate, API_TOKEN, range})
//   const response = await fetchSalesData(
//     1,
//     startDate,
//     endDate,
//     API_TOKEN,
//     range
//   );
//   return Math.ceil(response?.page_summary?.total / 100) || 0;
// }

// async function fetchSalesData(
//   pageNumber,
//   startDate,
//   endDate,
//   API_TOKEN,
//   range
// ) {
//   let url = `https://seller-api.takealot.com/v1/seller/transactions?page_number=${pageNumber}&page_size=100`;
//   if (range) {
//     url += `&date_from=${startDate}&date_to=${endDate}`;
//   } 
//   console.log("url", url)
  
//   const response = await axios.get(url, {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Key ${API_TOKEN}`,
//     },
//   });

//     // console.log("response.data",response.data)
//   return response.data;
// }


import axios from "axios";

export default async function getAllTransactions(
  startDate,
  endDate,
  API_TOKEN,
  range = true
) {
  const maxRetries = 5;
  const initialRetryDelay = 1000; // 1 second
  const maxRetryDelay = 16000; // 16 seconds
  const pageSize = 100;
  let allSales = [];

  const totalPages = await getTotalPages(startDate, endDate, API_TOKEN, range);

  if (totalPages === 0) {
    return allSales;
  }

  const fetchPage = async (pageNumber, retries = 0) => {
    try {
      const response = await fetchSalesData(
        pageNumber,
        startDate,
        endDate,
        API_TOKEN,
        range
      );
      return response?.transactions || [];
    } catch (error) {
      if (retries < maxRetries && error.response && error.response.status === 429) {
        const retryDelay = Math.min(initialRetryDelay * 2 ** retries, maxRetryDelay);
        console.log(`Rate limited. Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return fetchPage(pageNumber, retries + 1);
      } else {
        throw error;
      }
    }
  };

  const promises = Array.from({ length: totalPages }, (_, i) =>
    fetchPage(i + 1)
  );
  const pageResults = await Promise.all(promises);

  return pageResults.flat();
}

async function getTotalPages(startDate, endDate, API_TOKEN, range) {
  const response = await fetchSalesData(1, startDate, endDate, API_TOKEN, range);
  return Math.ceil(response?.page_summary?.total / 100) || 0;
}

async function fetchSalesData(pageNumber, startDate, endDate, API_TOKEN, range) {
  let url = `https://seller-api.takealot.com/v1/seller/transactions?page_number=${pageNumber}&page_size=100`;
  if (range) {
    url += `&date_from=${startDate}&date_to=${endDate}`;
  }

  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Key ${API_TOKEN}`,
    },
  });

  return response.data;
}
