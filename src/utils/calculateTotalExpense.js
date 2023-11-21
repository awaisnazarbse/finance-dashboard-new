const dayjs = require("dayjs");

export default function calculateTotalExpense(expense) {
  let totalExpense = 0;

  let startDate = dayjs(expense?.date);
  let endDate = dayjs(expense?.endDate);
  console.log("expense", expense);

  if (expense?.type === "Daily") {
    while (
      startDate.isSame(endDate, "day") ||
      startDate.isBefore(endDate, "day")
    ) {
      totalExpense += expense?.amount;
      startDate = startDate.add(1, "day");
    }
  } else if (expense?.type === "Weekly") {
    while (
      startDate.isSame(endDate, "week") ||
      startDate.isBefore(endDate, "week")
    ) {
      totalExpense += expense?.amount;
      startDate = startDate.add(1, "week");
    }
  } else if (expense.type === "Monthly") {
    while (
      startDate.isSame(endDate, "month") ||
      startDate.isBefore(endDate, "month")
    ) {
      totalExpense += expense?.amount;
      startDate = startDate.add(1, "month");
    }
  }

  return totalExpense;
}
