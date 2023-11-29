import dayjs from "dayjs";

// Calculate the weeks within the date range
function getWeeks(startDate, endDate) {
  // const weeks = [];
  // let currentDate = new Date(startDate);

  // while (currentDate <= endDate) {
  //   const startOfWeek = getStartOfWeek(currentDate);
  //   const endOfWeek = new Date(startOfWeek);
  //   endOfWeek.setDate(startOfWeek.getDate() + 6);
  //   weeks.push(`${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`);
  //   currentDate.setDate(currentDate.getDate() + 7);
  // }

  // return weeks;

  const weeks = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = startOfWeek.clone().add(6, "day");
    weeks.push(
      `${startOfWeek.format("YYYY-MM-DD")} - ${endOfWeek.format("YYYY-MM-DD")}`
    );
    currentDate = currentDate.add(7, "day");
  }

  return weeks;
}

// Calculate the months within the date range
function getMonths(startDate, endDate) {
  const months = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedMonth = dayjs(currentDate).format("MMM"); // Format as "Aug 2023"
    months.push(formattedMonth);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
}

// Calculate the start of the week for a given date
function getStartOfWeek(date) {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

// Format a date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Pad a number with leading zeros
function padZero(number) {
  return String(number).padStart(2, "0");
}

// Calculate the days within the date range
function getDays(startDate, endDate) {
  // console.log("start in days", startDate);
  // console.log("end in days", endDate);
  const days = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    // console.log("currentDate", currentDate);
    days.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // console.log("days",days);

  return days;
}

const intervals = {
  getMonths,
  getWeeks,
  getDays,
};

export default intervals;
