import dayjs from "dayjs";
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

export default function generateYearWeeks(months, duration) {
  const currentYear = dayjs().year();
  const startDate = dayjs(`${currentYear}-01-01`);
  const endDate = dayjs(`${currentYear}-12-31`);

  const weeks = [];
  let currentWeekStart = startDate.startOf("week");

  while (currentWeekStart.isBefore(endDate)) {
    const currentWeekEnd = currentWeekStart.endOf("week");
    const weekNumber = currentWeekStart.week(); // Use week() instead of isoWeek()

    weeks.push({
      start: currentWeekStart.format("YYYY-MM-DD"),
      end: currentWeekEnd.format("YYYY-MM-DD"),
      title: `${currentWeekStart.format("YYYY-MM-DD")}-${currentWeekEnd.format(
        "YYYY-MM-DD"
      )}`,
    });

    currentWeekStart = currentWeekEnd.add(1, "day");
  }

  // Filter weeks for the last 3 months
  const today = dayjs();
  let startDateRange;
  if (duration === "This Month") {
    startDateRange = today.startOf("month");
  } else {
    startDateRange = today.subtract(months, "month").startOf("month");
  }
  console.log("startDateRange", startDateRange);
  const filteredWeeks = weeks.filter(
    (week) =>
      (dayjs(week.start).isAfter(startDateRange) &&
        dayjs(week.end).isBefore(today)) ||
      dayjs(week.start).isSame(startDateRange) ||
      dayjs(week.end).isSame(today)
  );

  return filteredWeeks;
}
