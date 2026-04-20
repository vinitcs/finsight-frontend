/**
 * Format number to Indian currency format
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted currency string
 * Example: 1234567.89 => ₹12,34,567.89
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "₹0.00";

  const num = Math.abs(amount);
  const isNegative = amount < 0;

  // Indian number format with commas
  const parts = num.toFixed(2).split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  let formattedInteger = "";
  const len = integerPart.length;

  if (len <= 2) {
    formattedInteger = integerPart;
  } else if (len === 3) {
    formattedInteger = integerPart;
  } else if (len === 4) {
    formattedInteger = integerPart.slice(0, 1) + "," + integerPart.slice(1);
  } else if (len === 5) {
    formattedInteger = integerPart.slice(0, 2) + "," + integerPart.slice(2);
  } else {
    formattedInteger = integerPart.slice(0, len - 3);
    let remaining = integerPart.slice(len - 3);
    formattedInteger = formattedInteger.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    formattedInteger = formattedInteger + "," + remaining;
  }

  const result = `₹${formattedInteger}.${decimalPart}`;
  return isNegative ? `-${result}` : result;
};

/**
 * Format large amounts with abbreviations
 * @param {number} amount - Amount to format
 * @returns {string} Abbreviated amount
 * Example: 1234567 => 12.3L
 */
export const formatCurrencyCompact = (amount) => {
  if (amount === null || amount === undefined) return "₹0";

  const num = Math.abs(amount);
  const isNegative = amount < 0;

  if (num >= 10000000) {
    // Crore
    const crore = (num / 10000000).toFixed(1);
    return isNegative ? `-₹${crore}Cr` : `₹${crore}Cr`;
  } else if (num >= 100000) {
    // Lakh
    const lakh = (num / 100000).toFixed(1);
    return isNegative ? `-₹${lakh}L` : `₹${lakh}L`;
  } else if (num >= 1000) {
    // Thousand
    const thousand = (num / 1000).toFixed(1);
    return isNegative ? `-₹${thousand}K` : `₹${thousand}K`;
  } else {
    return formatCurrency(amount);
  }
};
