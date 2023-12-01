import dayjs from "dayjs";

export default function getDateRangeFormatted(
  duration,
  bodyStartDate,
  bodyEndDate
) {
  let startDate;
  let endDate;
  if (duration === "This Month") {
    startDate = dayjs().startOf("month").format("YYYY-MM-DD");
    endDate = dayjs().endOf("month").format("YYYY-MM-DD");
  } else if (duration === "Last Month") {
    startDate = dayjs()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    endDate = dayjs().subtract(1, "month").endOf("month").format("YYYY-MM-DD");
  } else if (duration === "Today") {
    startDate = dayjs().format("YYYY-MM-DD");
    endDate = dayjs().format("YYYY-MM-DD");
  } else if (duration === "Yesterday") {
    startDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    endDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  } else if (duration === "Last 3 Months") {
    startDate = dayjs()
      .subtract(2, "months")
      .startOf("month")
      .format("YYYY-MM-DD");
    endDate = dayjs().endOf("month").format("YYYY-MM-DD");
  } else if (duration === "Last 6 Months") {
    startDate = dayjs()
      .subtract(5, "months")
      .startOf("month")
      .format("YYYY-MM-DD");
    endDate = dayjs().endOf("month").format("YYYY-MM-DD");
  } else {
    startDate = dayjs(bodyStartDate).format("YYYY-MM-DD");
    endDate = dayjs(bodyEndDate).format("YYYY-MM-DD");
  }

  return { startDate, endDate };
}
