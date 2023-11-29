import dayjs from "dayjs";

export default function formatDateRange(
  startDate,
  endDate,
  isTileView = false
) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (start.isSame(end, "day")) {
    return isTileView &&
      start.isSame(dayjs(), "day") &&
      end.isSame(dayjs(), "day")
      ? "Today"
      : start.format("D MMM, YYYY");
  } else if (start.isSame(end, "month")) {
    return `${start.format("D")} - ${end.format("D MMM, YYYY")}`;
  } else if (start.isSame(end, "year")) {
    return `${start.format("D MMM")} - ${end.format("D MMM, YYYY")}`;
  } else {
    return `${start.format("D MMM, YYYY")} - ${end.format("D MMM, YYYY")}`;
  }
}
