export const Cashify = (num) => {
  return `₹ ${new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(num)}`;
};
