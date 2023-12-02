import getAllTransactions from "@/utils/getAllTransactions";
import getDateRangeFormatted from "@/utils/getDateRangeFormatted";
import axios from "axios";
import dayjs from "dayjs";
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const apiUrl = `https://seller-api.takealot.com/v2/notifications`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU1MDEzLCJqdGkiOiI3MTIxMWZkYmZhOWU0YmE5NTA5MWI3YTQ0NzBkMzNmY2JiYzc3MmEwMzRlYzU5MTUxMTk2MjEwMTUxZTczNmQwZjhjY2VhZjllZGE1YTllNDdhYWJiMjNhY2I4NzFhMjQ4NDFlMGI5ZWY2NjQ3OGZhODkyZTUzZmU2Yzg3MmY1NyIsImV4cCI6MTcwMTUwNTYzMCwiYXVkIjoidXJuOnRha2VhbG90OnNlbGxlcnMiLCJpc3MiOiJ1cm46dGFrZWFsb3Q6c2VsbGVyLWJmZiJ9.6kA3e4O_4I8N--BFvTmCRU8uLIL3u2PdoxklFAVt0Pw`,
      },
    });
    const data = await response.data;
    const messages = data?.notifications?.map((e) => JSON.parse(e?.message));

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error,
    });
  }
}
