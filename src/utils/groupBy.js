import dayjs from "dayjs";

const groupDataByHourly = (salesData, expensesData) => {
  const hourlyData = {};

  // Group sales data by hour
  salesData.forEach((sale) => {
    const saleDate = new Date(sale.order_date);
    const hourKey = `${padZero(saleDate.getHours())}:00:00`;
    // console.log("hourKey", hourKey);
    if (!hourlyData[hourKey]) {
      hourlyData[hourKey] = {
        rev: 0,
        unitSold: 0,
        refunds: 0,
        refundCost: 0,
        fee: 0,
        grossProfit: 0,
        margin: 0,
        netProfit: 0,
        promo: 0,
        refundPercent: 0,
        expenses: 0,
        orders: 0,
      };
    }

    // console.log("sale", sale);
    if (
      !sale?.sale_status?.includes("Cancelled")
    ) {
      hourlyData[hourKey].rev += sale.selling_price;
      hourlyData[hourKey].unitSold += sale.quantity;
    }
    if (sale.sale_status === "Returned") {
      hourlyData[hourKey].refundCost += sale.selling_price - sale?.total_fee;
      hourlyData[hourKey].refunds += sale.quantity;
    }

    if (sale.promotion) {
      hourlyData[hourKey].promo += sale.selling_price;
    }

    hourlyData[hourKey].fee += sale.total_fee;
    hourlyData[hourKey].orders += 1;
  });

  // Calculate metrics for each hour
  for (const key in hourlyData) {
    if (hourlyData.hasOwnProperty(key)) {
      const hour = hourlyData[key];
      hour.grossProfit = hour.rev - hour.fee;
      hour.netProfit = hour.rev - hour.fee - hour.expenses;
      hour.refundPercent = (hour.refunds / hour.unitSold) * 100;
      hour.margin = (hour.netProfit / hour.rev) * 100;
    }
  }

  return hourlyData;
};

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function groupDataByDaily(salesData, expensesData) {
  const dailyData = {};

  // Group sales data by day
  salesData.forEach((sale) => {
    const saleDate = new Date(sale.order_date);
    const dayKey = `${saleDate.getFullYear()}-${padZero(
      saleDate.getMonth() + 1
    )}-${padZero(saleDate.getDate())}`;

    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        rev: 0,
        unitSold: 0,
        refunds: 0,
        refundCost: 0,
        fee: 0,
        grossProfit: 0,
        margin: 0,
        netProfit: 0,
        promo: 0,
        refundPercent: 0,
        expenses: 0,
        orders: 0,
      };
    }

    if (
      !sale?.sale_status?.includes("Cancelled")
    ) {
      dailyData[dayKey].rev += sale.selling_price;
      dailyData[dayKey].unitSold += sale.quantity;
    }

    if (sale.sale_status === "Returned") {
      dailyData[dayKey].refundCost += sale.selling_price - sale?.total_fee;
      dailyData[dayKey].refunds += sale.quantity;
    }

    if (sale.promotion) {
      dailyData[dayKey].promo += sale.selling_price;
    }

    dailyData[dayKey].fee += sale.total_fee;
    dailyData[dayKey].orders += 1;
  });

  // Calculate metrics for each day
  for (const key in dailyData) {
    if (dailyData.hasOwnProperty(key)) {
      const day = dailyData[key];
      day.grossProfit = day.rev - day.fee;
      day.netProfit = day.rev - day.fee - day.expenses;
      day.refundPercent = (day.refunds / day.unitSold) * 100;
      day.margin = (day.netProfit / day.rev) * 100;
    }
  }

  return dailyData;
}

function groupDataByWeekly(salesData, expensesData) {
  const weeklyData = {};

  salesData.forEach((sale) => {
    // const date = new Date(sale.order_date);
    // const startOfWeek = getStartOfWeek(date);
    // const endOfWeek = new Date(startOfWeek);
    // endOfWeek.setDate(startOfWeek.getDate() + 6);
    // const weekKey = `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
    const date = dayjs(sale.order_date);
    const startOfWeek = date.startOf("week");
    const endOfWeek = startOfWeek.clone().add(6, "day"); // Use clone to avoid mutating the original object
    const weekKey = `${startOfWeek.format("YYYY-MM-DD")} - ${endOfWeek.format(
      "YYYY-MM-DD"
    )}`;
    console.log("week", weekKey);

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = {
        rev: 0,
        unitSold: 0,
        refunds: 0,
        refundCost: 0,
        fee: 0,
        grossProfit: 0,
        margin: 0,
        netProfit: 0,
        promo: 0,
        refundPercent: 0,
        expenses: 0,
        orders: 0,
      };
    }
    if (
      !sale?.sale_status?.includes("Cancelled")
    ) {
      weeklyData[weekKey].rev += sale.selling_price;
      weeklyData[weekKey].unitSold += sale.quantity;
    }
    if (sale.sale_status === "Returned") {
      weeklyData[weekKey].refundCost += sale.selling_price - sale?.total_fee;
      weeklyData[weekKey].refunds += sale.quantity;
    }

    if (sale.promotion) {
      weeklyData[weekKey].promo += sale.selling_price;
    }

    weeklyData[weekKey].fee += sale.total_fee;
    weeklyData[weekKey].orders += 1;
  });

  // Calculate metrics for each week
  for (const key in weeklyData) {
    if (weeklyData.hasOwnProperty(key)) {
      const week = weeklyData[key];
      week.grossProfit = week.rev - week.fee;
      week.netProfit = week.rev - week.fee - week.expenses;
      week.refundPercent = (week.refunds / week.unitSold) * 100;
      week.margin = (week.netProfit / week.rev) * 100;
    }
  }

  return weeklyData;
}

function groupDataByMonthly(salesData, expensesData) {
  const monthlyData = {};

  salesData.forEach((sale) => {
    const date = new Date(sale.order_date);
    const formattedMonth = dayjs(date).format("MMM"); // Format as "Aug 2023"

    if (!monthlyData[formattedMonth]) {
      monthlyData[formattedMonth] = {
        rev: 0,
        unitSold: 0,
        refunds: 0,
        refundCost: 0,
        fee: 0,
        grossProfit: 0,
        margin: 0,
        netProfit: 0,
        promo: 0,
        refundPercent: 0,
        expenses: 0,
        orders: 0,
      };
    }

    if (
      !sale?.sale_status?.includes("Cancelled")
    ) {
      monthlyData[formattedMonth].rev += sale.selling_price;
      monthlyData[formattedMonth].unitSold += sale.quantity;
    }

    if (sale.sale_status === "Returned") {
      monthlyData[formattedMonth].refundCost +=
        sale.selling_price - sale?.total_fee;
      monthlyData[formattedMonth].refunds += sale.quantity;
    }

    if (sale.promotion) {
      monthlyData[formattedMonth].promo += sale.selling_price;
    }

    monthlyData[formattedMonth].fee += sale.total_fee;
    monthlyData[formattedMonth].orders += 1;
  });

  // Calculate metrics for each month
  for (const key in monthlyData) {
    if (monthlyData.hasOwnProperty(key)) {
      const month = monthlyData[key];
      month.grossProfit = month.rev - month.fee;
      month.netProfit = month.rev - month.fee - month.expenses;
      month.refundPercent = (month.refunds / month.unitSold) * 100;
      month.margin = (month.netProfit / month.rev) * 100;
    }
  }

  return monthlyData;
}

function groupDataByQuarterly(salesData, expensesData) {
  const quarterlyData = {};

  // Group sales data by quarter
  salesData.forEach((sale) => {
    const saleDate = new Date(sale.order_date);
    const quarterKey = getQuarterKey(saleDate);

    if (!quarterlyData[quarterKey]) {
      quarterlyData[quarterKey] = {
        rev: 0,
        unitSold: 0,
        refunds: 0,
        refundCost: 0,
        fee: 0,
        grossProfit: 0,
        margin: 0,
        netProfit: 0,
        promo: 0,
        refundPercent: 0,
        expenses: 0,
        orders: 0,
      };
    }
    if (
      !sale?.sale_status?.includes("Cancelled")
    ) {
      quarterlyData[quarterKey].rev += sale.selling_price;
      quarterlyData[quarterKey].unitSold += sale.quantity;
    }

    if (sale.sale_status === "Returned") {
      quarterlyData[quarterKey].refundCost +=
        sale.selling_price - sale?.total_fee;
      quarterlyData[quarterKey].refunds += sale.quantity;
    }

    if (sale.promotion) {
      quarterlyData[quarterKey].promo += sale.selling_price;
    }

    quarterlyData[quarterKey].fee += sale.total_fee;
    quarterlyData[quarterKey].orders += 1;
  });

  // Calculate metrics for each quarter
  for (const key in quarterlyData) {
    if (quarterlyData.hasOwnProperty(key)) {
      const quarter = quarterlyData[key];
      quarter.grossProfit = quarter.rev - quarter.fee;
      quarter.netProfit = quarter.rev - quarter.fee - quarter.expenses;
      quarter.refundPercent = (quarter.refunds / quarter.unitSold) * 100;
      quarter.margin = (quarter.netProfit / quarter.rev) * 100;
    }
  }

  return quarterlyData;
}

function getStartOfWeek(date) {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 1);
  return new Date(date.setDate(diff));
}

function getQuarterKey(date) {
  const quarter = Math.ceil((date.getMonth() + 1) / 3);
  return `${date.getFullYear()}-Q${quarter}`;
}

// Format a date as "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const groupBy = {
  groupDataByDaily,
  groupDataByHourly,
  groupDataByMonthly,
  groupDataByQuarterly,
  groupDataByWeekly,
  padZero,
};

export default groupBy;
