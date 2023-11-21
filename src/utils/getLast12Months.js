const dayjs = require("dayjs");

exports.getLast12Months = () => {
  const today = dayjs();
  const last12Months = [];

  for (let i = 11; i >= 0; i--) {
    const monthStartDate = today.clone().subtract(i, "months").startOf("month");
    const monthEndDate = today.clone().subtract(i, "months").endOf("month");

    last12Months.push(monthStartDate.format("MMM YYYY"));
  }

  return last12Months;
};
