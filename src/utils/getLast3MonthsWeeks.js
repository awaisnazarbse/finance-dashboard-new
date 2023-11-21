const dayjs = require("dayjs");

exports.getLast3MonthsWeeks = () => {
  const today = dayjs();
  const weeksInMonth = [];

  for (let i = 2; i >= 0; i--) {
    // Loop for the last 3 months
    const monthStartDate = today.clone().subtract(i, "months").startOf("month");
    const monthEndDate = today.clone().subtract(i, "months").endOf("month");

    const weekStart = monthStartDate.clone().startOf("isoWeek");
    const weekEnd = monthStartDate.clone().endOf("isoWeek");

    while (weekStart.isBefore(monthEndDate)) {
      weeksInMonth.push(
        `${weekStart.format("DD/MM/YY")} - ${weekEnd.format("DD/MM/YY")}`
      );

      weekStart.add(1, "week");
      weekEnd.add(1, "week");
      if (weekEnd.isAfter(monthEndDate)) {
        weekEnd.subtract(weekEnd.diff(monthEndDate, "days"), "days");
      }
    }
  }

  return weeksInMonth;
};
