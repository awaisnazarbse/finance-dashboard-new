export default function calculatePercentageChange(currentValue, previousValue) {
  if (previousValue === 0) {
    return currentValue > 0 ? 100 : 0;
  }

  const change = ((currentValue - previousValue) / previousValue) * 100;
  return (Math.round(change * 100) / 100).toFixed(2);
}
