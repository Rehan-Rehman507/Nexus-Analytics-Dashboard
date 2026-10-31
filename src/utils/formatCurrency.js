/**
 * Formats a number as a currency string.
 * @param {number} amount
 * @param {string} currency - 'USD' | 'EUR' | 'GBP'
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '$0.00';
  }

  const symbolMap = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
  };

  const symbol = symbolMap[currency] || '$';

  return `${symbol}${Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Formats large numbers compactly (e.g. 48.2k)
 */
export const formatCompactNumber = (number) => {
  if (!number && number !== 0) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
};
