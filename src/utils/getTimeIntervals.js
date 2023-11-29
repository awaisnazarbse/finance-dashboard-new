const dayjs = require("dayjs");
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

const getDaysInRange = (startDate, endDate) => {
  const dateRange = [];
  let currentDate = dayjs(startDate);

  while (currentDate <= endDate) {
    const formattedDate = currentDate.format("YYYY-MM-DD");
    dateRange.push({
      title: formattedDate,
      startDate: currentDate.clone().format("YYYY-MM-DD"),
      endDate: currentDate.clone().format("YYYY-MM-DD"),
    });
    currentDate.add(1, "days");
  }

  return dateRange.reverse();
};

const getWeeksInRange = (startDate, endDate) => {
  // const dateRange = [];
  // let currentDate = moment(startDate);

  // while (currentDate <= endDate) {
  //   const weekStartDate = currentDate.clone().startOf("week");
  //   const weekEndDate = currentDate.clone().endOf("week");

  //   const formattedStartDate = weekStartDate.format("YYYY-MM-DD");
  //   const formattedEndDate = weekEndDate.format("YYYY-MM-DD");

  //   dateRange.push({
  //     title: `${formattedStartDate} - ${formattedEndDate}`,
  //     startDate: weekStartDate.clone().format("YYYY-MM-DD"),
  //     endDate: weekEndDate.clone().format("YYYY-MM-DD"),
  //   });

  //   currentDate.add(1, "weeks");
  // }

  // return dateRange;
  const currentYear = dayjs().year();
  const yearStartDate = dayjs(`${currentYear}-01-01`);
  const yearEndDate = dayjs(`${currentYear}-12-31`);

  const weeks = [];
  let currentWeekStart = yearStartDate.startOf("week");

  while (currentWeekStart.isBefore(yearEndDate)) {
    const currentWeekEnd = currentWeekStart.endOf("week");
    const weekNumber = currentWeekStart.week(); // Use week() instead of isoWeek()

    weeks.push({
      startDate: currentWeekStart.format("YYYY-MM-DD"),
      endDate: currentWeekEnd.format("YYYY-MM-DD"),
      title: `WK${weekNumber}`,
    });

    currentWeekStart = currentWeekEnd.add(1, "day");
  }
  const filteredWeeks = weeks.filter(
    (week) =>
      dayjs(week.startDate).isAfter(dayjs(startDate)) &&
      dayjs(week.endDate).isBefore(dayjs(endDate))
  );

  return filteredWeeks.reverse();
};

const getMonthsInRange = (startDate, endDate) => {
  const dateRange = [];
  let currentDate = dayjs(startDate);

  while (currentDate <= endDate) {
    const lastDayOfMonth = currentDate.clone().endOf("month");
    const formattedStartDate = currentDate.format("YYYY-MM-DD");
    const formattedEndDate = lastDayOfMonth.format("YYYY-MM-DD");

    dateRange.push({
      title: currentDate.format("MMMM YYYY"),
      startDate: currentDate.clone().format("YYYY-MM-DD"),
      endDate: lastDayOfMonth.clone().format("YYYY-MM-DD"),
    });

    currentDate.add(1, "months").startOf("month");
  }

  return dateRange.reverse();
};

const groupBy = {
  getDaysInRange,
  getMonthsInRange,
  getWeeksInRange,
};

export default groupBy;
