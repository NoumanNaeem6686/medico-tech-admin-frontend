export const CalculateCustomerHistoryAmount = (
  time: any,
  psychicPrice: number,
) => {
  return ((time / 60) * psychicPrice).toFixed(2);
};
