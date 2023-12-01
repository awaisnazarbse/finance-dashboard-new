import getAllTransactions from "@/utils/getAllTransactions";
import getDateRangeFormatted from "@/utils/getDateRangeFormatted";
import axios from "axios";
import dayjs from "dayjs";
import fetch from "node-fetch";

export default async function handler(req, res) {
  //   const body = JSON.parse(req.body);
  // console.log("calling api", body);

  try {
    // console.log("date range", { startDate, endDate });
    const apiUrl = `https://seller-api.takealot.com/v2/notifications`;
    // const API_TOKEN = body?.apiKey;
    // const API_TOKEN =
    //   "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5";
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU1MDEzLCJqdGkiOiI3MTIxMWZkYmZhOWU0YmE5NTA5MWI3YTQ0NzBkMzNmY2JiYzc3MmEwMzRlYzU5MTUxMTk2MjEwMTUxZTczNmQwZjhjY2VhZjllZGE1YTllNDdhYWJiMjNhY2I4NzFhMjQ4NDFlMGI5ZWY2NjQ3OGZhODkyZTUzZmU2Yzg3MmY1NyIsImV4cCI6MTcwMTUwNTYzMCwiYXVkIjoidXJuOnRha2VhbG90OnNlbGxlcnMiLCJpc3MiOiJ1cm46dGFrZWFsb3Q6c2VsbGVyLWJmZiJ9.6kA3e4O_4I8N--BFvTmCRU8uLIL3u2PdoxklFAVt0Pw`,
      },
      auth: {
        username:
          "abda55a7adc3c2892388c178514e90b6aa17da35b02a63471a3bc790dea4cf1dfd1fcdbe62022a400dbe95c744e1d951fc4899129762d7a0987447af0fee54b5",
      },
    });
    // headers: {
    //   Accept: "application/json",
    //    : `Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU1MDEzLCJqdGkiOiI3MTIxMWZkYmZhOWU0YmE5NTA5MWI3YTQ0NzBkMzNmY2JiYzc3MmEwMzRlYzU5MTUxMTk2MjEwMTUxZTczNmQwZjhjY2VhZjllZGE1YTllNDdhYWJiMjNhY2I4NzFhMjQ4NDFlMGI5ZWY2NjQ3OGZhODkyZTUzZmU2Yzg3MmY1NyIsImV4cCI6MTcwMTUwNTYzMCwiYXVkIjoidXJuOnRha2VhbG90OnNlbGxlcnMiLCJpc3MiOiJ1cm46dGFrZWFsb3Q6c2VsbGVyLWJmZiJ9.6kA3e4O_4I8N--BFvTmCRU8uLIL3u2PdoxklFAVt0Pw`,
    // }
    // console.log("response",response)
    const data = await response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error,
    });
  }
}
